import { useEffect } from "react";
import { setAppState } from "../../redux/features/appStateSlice";
import { useAppDispatch } from "../../hooks/hooksRedux";
import { IPageWrapper } from "../../types/interfaces";

const PageWrapper = ({ state, children }: IPageWrapper) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setAppState(state));
  }, [state, dispatch]);

  return children;
};

export default PageWrapper;
