import Footer from "../../Footer/Footer"
import Header from "../../header/Header"
import s from './Wrapper.module.scss'

const Wrapper = ({children}) => {
  return (
    <>
      <Header/>
      <main className={s.main}>
        <div className={s.container}>
          {children}
        </div>
      </main>
      <Footer/>
    </>
  )
}

export default Wrapper