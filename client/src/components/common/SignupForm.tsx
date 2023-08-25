import * as React from "react";
import { LoadingButton } from "@mui/lab";
import { Alert, Box, Button, Stack, TextField, Slider } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import userApi from "../../api/modules/user.api";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import { setUser } from "../../redux/features/userSlice";
import AvatarEditor from "react-avatar-editor";
import avatar from "../../assets/profile.png";
import styles from "../../styles/Username.module.css";
import { useAppDispatch } from "../../hooks/hooksRedux";
import { ISignForm } from "../../types/interfaces";
import { IUserprofile } from "../../types/interfaces";

const initialState: IUserprofile = {
  cropperOpen: false,
  img: null,
  zoom: 2,
  croppedImg:
    "https://upload.wikimedia.org/wikipedia/commons/0/09/Man_Silhouette.png",
};

const SignupForm = ({ switchAuthState }: ISignForm) => {
  var editor: any = "";
  const dispatch = useAppDispatch();

  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [file, setFile] = useState();
  const [picture, setPicture] = useState(initialState);
  // 对头像进行处理的函数
  const handleSlider = (e: any) => {
    setPicture({
      ...picture,
      zoom: Number(e.target.value),
    });
  };

  const handleCancel = () => {
    setPicture({
      ...picture,
      cropperOpen: false,
    });
  };

  const setEditorRef = (ed: any) => {
    editor = ed;
    console.log("editor: " + editor);
  };

  const handleSave = async () => {
    const canvasScaled = editor.getImageScaledToCanvas();
    console.log("canvasScaled", canvasScaled);
    const croppedImg = canvasScaled.toDataURL();
    console.log("croppedImg", croppedImg);
    // const base64 = await convertToBase64(canvasScaled);
    // console.log("base64", base64);

    setPicture({
      ...picture,
      img: null,
      cropperOpen: false,
      croppedImg: croppedImg,
    });
    setFile(croppedImg);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let url: string = "";
    if (e.target.files instanceof FileList) {
      url = URL.createObjectURL(e.target.files[0]);
    }
    // console.log("i am in handlefilechange", e.target.files[0]);
    // let url = URL.createObjectURL(e.target.files[0]);

    // let url = URL.createObjectURL(e.target.files[0]);

    console.log(url);
    setPicture({
      ...picture,
      img: url,
      cropperOpen: true,
    });
  };
  // 对头像处理函数完毕
  const signinForm = useFormik({
    initialValues: {
      password: "",
      username: "",
      displayName: "",
      confirmPassword: "",
      profile: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, "username minimum 8 characters")
        .required("username is required"),
      password: Yup.string()
        .min(8, "password minimum 8 characters")
        .required("password is required"),
      displayName: Yup.string()
        .min(8, "displayName minimum 8 characters")
        .required("displayName is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "confirmPassword not match")
        .min(8, "confirmPassword minimum 8 characters")
        .required("confirmPassword is required"),
    }),
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || "" });
      setErrorMessage(undefined);
      setIsLoginRequest(true);
      console.log("sign up module");
      console.log(values);
      const { response, err } = await userApi.signup(values);
      setIsLoginRequest(false);

      if (response) {
        signinForm.resetForm();
        dispatch(setUser(response));
        dispatch(setAuthModalOpen(false));
        toast.success("Sign in success");
      }

      if (err) setErrorMessage(err.message);
    },
  });
  /** formik doensn't support file upload so we need to create this handler */

  return (
    <Box component="form" onSubmit={signinForm.handleSubmit}>
      <Stack spacing={3}>
        <div className={styles.up}>
          <Box display="flex">
            <Box width="35%">
              {/* 进行上传头像处理 */}
              <div className="profile flex justify-center py-4">
                <label htmlFor="profile">
                  <img
                    src={file || avatar}
                    className={styles.profile_img}
                    alt="avatar"
                  />
                </label>

                <input
                  onChange={handleFileChange}
                  type="file"
                  id="profile"
                  name="profile"
                />
              </div>
            </Box>

            {picture.cropperOpen && (
              <Box display="block">
                <AvatarEditor
                  ref={setEditorRef}
                  image={picture.img}
                  width={200}
                  height={200}
                  border={50}
                  color={[255, 255, 255, 0.6]} // RGBA
                  rotate={0}
                  scale={picture.zoom}
                />
                <Slider
                  aria-label="raceSlider"
                  value={picture.zoom}
                  min={1}
                  max={10}
                  step={0.1}
                  onChange={handleSlider}
                ></Slider>
                <Box>
                  <Button variant="contained" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>Save</Button>
                </Box>
              </Box>
            )}
          </Box>
          {/* 上传头像模块结束 */}
        </div>
        <TextField
          type="text"
          placeholder="username"
          name="username"
          fullWidth
          value={signinForm.values.username}
          onChange={signinForm.handleChange}
          color="success"
          error={
            signinForm.touched.username &&
            signinForm.errors.username !== undefined
          }
          helperText={signinForm.touched.username && signinForm.errors.username}
        />
        <TextField
          type="text"
          placeholder="display name"
          name="displayName"
          fullWidth
          value={signinForm.values.displayName}
          onChange={signinForm.handleChange}
          color="success"
          error={
            signinForm.touched.displayName &&
            signinForm.errors.displayName !== undefined
          }
          helperText={
            signinForm.touched.displayName && signinForm.errors.displayName
          }
        />
        <TextField
          type="password"
          placeholder="password"
          name="password"
          fullWidth
          value={signinForm.values.password}
          onChange={signinForm.handleChange}
          color="success"
          error={
            signinForm.touched.password &&
            signinForm.errors.password !== undefined
          }
          helperText={signinForm.touched.password && signinForm.errors.password}
        />
        <TextField
          type="password"
          placeholder="confirm password"
          name="confirmPassword"
          fullWidth
          value={signinForm.values.confirmPassword}
          onChange={signinForm.handleChange}
          color="success"
          error={
            signinForm.touched.confirmPassword &&
            signinForm.errors.confirmPassword !== undefined
          }
          helperText={
            signinForm.touched.confirmPassword &&
            signinForm.errors.confirmPassword
          }
        />
      </Stack>

      <LoadingButton
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        sx={{ marginTop: 4 }}
        loading={isLoginRequest}
      >
        sign up
      </LoadingButton>

      <Button fullWidth sx={{ marginTop: 1 }} onClick={() => switchAuthState()}>
        sign in
      </Button>

      {errorMessage && (
        <Box sx={{ marginTop: 2 }}>
          <Alert severity="error" variant="outlined">
            {errorMessage}
          </Alert>
        </Box>
      )}
    </Box>
  );
};

export default SignupForm;
