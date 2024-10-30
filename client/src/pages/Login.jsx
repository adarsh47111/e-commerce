import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import { login_api } from "../api";
import { login } from "../redux/slices/auth";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const isMobile = window.outerWidth < 640;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "a@g.com",
      password: "123456",
    },
  });

  const formFields = [
    {
      label: "Email",
      name: "email",
      type: "text",
      placeholder: "Enter your email",
      options: {
        required: "Email is  required",
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
          message: "Invalid email",
        },
      },
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Enter your password",
      options: {
        required: "Password is required",
        minLength: {
          value: 3,
          message: "Password must be at least 3 characters long",
        },
      },
    },
  ];

  const submit = async (formData) => {
    const { status, message, data } = await login_api({
      email: formData.email,
      password: formData.password,
    });
    if (status === "success") {
      dispatch(login(data));
      navigate("/");
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  return (
    <div className="absolute sm:h-screen w-screen top-10 sm:flex sm:justify-center sm:items-center">
      <div className="h-full sm:h-fit sm:min-h-[70%] w-full sm:w-[70%] p-4 flex sm:shadow-2xl sm:border rounded-2xl">
        <div className="hidden sm:block w-1/2 h-full overflow-hidden">
          <img
            className="object-cover w-full h-full"
            src="/illustration1.jpg"
            alt="login_image"
          />
        </div>
        <form className="flex flex-col sm:justify-center sm:items-center w-screen sm:w-1/2">
          <div className="flex flex-col space-y-4 items-center sm:w-[50%]">
            <p className=" text-3xl mb-6 sm:mb-0 sm:text-2xl font-custom font-semibold text-left w-full sm:text-center">
              Sign In
            </p>

            <div className="w-full space-y-8 sm:space-y-4">
              {formFields.map(
                ({ label, name, type, placeholder, options }, index) => (
                  <div key={index} className="relative w-full borderl">
                    <label className="sm:hidden absolute -top-[10px] left-7 bg-white px-1 text-neutral-400 text-sm rounded-full">
                      {label}
                    </label>
                    <input
                      className="border sm:border-none sm:bg-slate-100 rounded-3xl h-10 w-full outline-none p-4 py-6 sm:py-4 focus:outline focus:outline-primary"
                      type={type}
                      placeholder={placeholder}
                      {...register(name, options)}
                    />
                    {errors[name] && (
                      <p className="text-sm font-medium p-2 text-primary">
                        {errors[name].message}
                      </p>
                    )}
                  </div>
                )
              )}
            </div>
            <div className="flex justify-between w-full px-2 text-sm">
              <div>
                <input className="mx-2 h-3 w-3 rounded-full" type="checkbox" />
                <span>Remember Me</span>
              </div>
              <NavLink className={"underline hover:text-primary"} to="#">
                Forgot Password?
              </NavLink>
            </div>
            <Button
              className="w-full h-12 sm:h-10 rounded-full"
              onClick={handleSubmit(submit)}
            >
              Sign In
            </Button>
            <p className="text-sm font-custom">
              Don't have an account?
              <NavLink
                to="/register"
                className="pl-2 text-red-500 tracking-tighter font-semibold"
              >
                Sign Up Now
              </NavLink>
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 my-6 w-full text-neutral-400">
            <p className="text-xl font-semibold">OR</p>
            <Button variant="ghost">
              <img
                className="h-16 sm:h-12 w-16 sm:w-12 p-2"
                src="/google.png"
                alt="google"
              />
            </Button>
            <p className="font-medium leading-[12px]">
              By continuing you confirm that you agree
            </p>
            <p className="font-medium leading-[12px]">
              with our Terms & Conditions
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
