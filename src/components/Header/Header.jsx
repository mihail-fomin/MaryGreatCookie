import style from './Header.module.css'
import logo from '../../assets/img/logo-intro.svg'
import { Container } from '../Container/Container'

export const Header = () => (
	<header className={style.header}>
		<Container className={style.container}>
			<img className={style.logo} src={logo} alt="Логотип" />
		</Container>
	</header>
)