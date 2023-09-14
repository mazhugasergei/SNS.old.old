import { useDispatch, useSelector } from "react-redux"
import { RootState } from "store/store"
import { toggleMenu, toggleLogIn, toggleSignUp } from "store/slices/menuSlice"

export default () => {
  const dispatch = useDispatch()
  const menu_opened = useSelector((state: RootState) => state.menu.opened)
  const logging_in = useSelector((state: RootState) => state.menu.logging_in)
  const signing_up = useSelector((state: RootState) => state.menu.signing_up)

  const handleToggleMenu = () => {
    if(logging_in) dispatch(toggleLogIn())
    else if (signing_up) dispatch(toggleSignUp())
    dispatch(toggleMenu())
  }

  return { menu_opened, handleToggleMenu }
}