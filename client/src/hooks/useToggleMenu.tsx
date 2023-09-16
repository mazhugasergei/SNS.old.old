import { useDispatch, useSelector } from "react-redux"
import { RootState } from "store/store"
import { toggleMenu, toggleLogIn, toggleSignUp, toggleConfirmEmail } from "store/slices/menuSlice"

export default () => {
  const dispatch = useDispatch()
  const menu_opened = useSelector((state: RootState) => state.menu.menu_opened)
  const logging_in = useSelector((state: RootState) => state.menu.logging_in)
  const signing_up = useSelector((state: RootState) => state.menu.signing_up)
  const confirming_email = useSelector((state: RootState) => state.menu.confirming_email)

  const handleToggleMenu = () => {
    if(logging_in) dispatch(toggleLogIn())
    else if(signing_up) dispatch(toggleSignUp())
    else if(confirming_email) dispatch(toggleConfirmEmail())
    dispatch(toggleMenu())
  }

  return { menu_opened, handleToggleMenu }
}