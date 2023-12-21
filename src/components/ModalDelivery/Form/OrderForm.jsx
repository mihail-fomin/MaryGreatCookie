import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker'; // Import registerLocale from react-datepicker
import ru from 'date-fns/locale/ru'; // Import the Russian locale
import "react-datepicker/dist/react-datepicker.css";

import style from '../ModalDelivery.module.css';
import classNames from 'classnames';

import { validateDeliveryForm } from './validateDeliveryForm';
import { submitForm } from './tgMessageRequest';
import InputField from './InputField';
import RadioButton from './RadioButton';
import OrderDeliveryForm from './OrderDeliveryForm';
import AlertModal from '../AlertModal';

registerLocale('ru', ru);


export default function ModalForm() {
  const { orderList } = useSelector(state => state.order)
  const [alertModalActive, setAlertModalActive] = React.useState(false)
  const [selectedDate, setStartDate] = React.useState(null);
  console.log('selectedDate: ', selectedDate);

  let handleColor = (time) => {
    return time.getHours() >= 10 && time.getHours() <= 19 ? style.textSuccess : style.textError;
  };

  const addDays = (days) => {
    return new Date().setDate(new Date().getDate() + days);
  }

  return (
    <>
      <Formik
        initialValues={{
          name: '',
          phone: '',
          format: 'delivery',
          adress: '',
          floor: '',
          intercom: '',
          comments: '',
        }}
        validate={validateDeliveryForm}
        onSubmit={
          (values) => {
            submitForm(values, orderList, selectedDate)
            setAlertModalActive(true)
          }
        }
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Form
            className={style.form}
            onSubmit={handleSubmit}
          >
            <InputField
              label='Имя'
              type="text"
              name="name"
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={values.name}
              errors={errors.name}
              touched={touched.name}
            />
            <InputField
              label='Телефон'
              type="tel"
              name="phone"
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={values.phone}
              errors={errors.phone}
              touched={touched.phone}
            />
            <fieldset className={style.fieldset_radio}>
              <RadioButton
                label='Самовывоз'
                value='pickup'
                handleChange={handleChange}
              />
              <RadioButton
                label='Доставка'
                value='delivery'
                handleChange={handleChange}
              />
            </fieldset>
            {values.format === 'delivery' && (
              <OrderDeliveryForm
                handleChange={handleChange}
                handleBlur={handleBlur}
                values={values}
                errors={errors}
                touched={touched}
              />
            )}
            <Field
              as='textarea'
              className={classNames(style.comments)}
              rows={3}
              type='text'
              name='comments'
              value={values.comments}
              placeholder='Комментарии к заказу'
              onChange={handleChange}
            />
            <DatePicker
              locale="ru"
              selected={selectedDate}
              showTimeSelect
              onChange={(date) => setStartDate(date)}
              dateFormat="dd MMMM yyyy HH:mm"
              minDate={new Date()}
              maxDate={addDays(14)}
              timeClassName={handleColor}
              timeFormat="HH:mm"
              placeholderText="Выберите дату и время"
              className={style.datePicker} 
              timeCaption="Время"
            />

            <button
              className={style.submit}
              type='submit'
              disabled={!Object.keys(touched).length || Object.keys(errors).length}
            >
              Оформить
            </button>
          </Form>
        )}
      </Formik>
      {alertModalActive &&
        <AlertModal active={alertModalActive} setActive={setAlertModalActive} />
      }
    </>

  )
}