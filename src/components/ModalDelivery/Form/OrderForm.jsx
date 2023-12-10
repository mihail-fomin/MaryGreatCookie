import React from 'react'
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import style from '../ModalDelivery.module.css';
import classNames from 'classnames';

import { closeModal } from '../../../store/modalDelivery/modalDeliverySlice';
import { validateDeliveryForm } from './validateDeliveryForm';
import { submitForm } from './tgMessageRequest';
import { clearOrder } from '../../../store/order/orderSlice';
import InputField from './InputField';
import RadioButton from './RadioButton';
import OrderDeliveryForm from './OrderDeliveryForm';
import AlertModal from '../AlertModal'


export default function ModalForm() {
  const dispatch = useDispatch()
  const { orderList } = useSelector(state => state.order)
  const [alertModalActive, setAlertModalActive] = React.useState(false)

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
            submitForm(values, orderList)
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