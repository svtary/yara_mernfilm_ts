import { useEffect } from "react";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooksRedux";

const ProtectedPage = ({ children }: any) => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(setAuthModalOpen(!user));
  }, [user, dispatch]);

  return user ? children : null;
};

export default ProtectedPage;
