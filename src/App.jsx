import { Header } from "./components/Header/Header"
import { Navigation } from "./components/Navigation/Navigation"
import { Catalog } from "./components/Catalog/Catalog"
import { Footer } from "./components/Footer/Footer"
import { Provider } from "react-redux"
import { store } from "./store/index.js"
import { ModalDelivery } from "./components/ModalDelivery/ModalDelivery"

export const App = () => {

  return (
    <Provider store={store}>
      <Header />
      <main>
      <h1 className="app-inactive__title">Сайт временно не работает. Приносим свои извинения...</h1>
        {/* <Navigation />
        <Catalog /> */}
      </main>
      <Footer />
      <ModalDelivery />
    </Provider>
  )
}


