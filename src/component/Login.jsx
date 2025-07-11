import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as storeLogin } from "../store/authSlice";
import { Button, Input, Logo } from "../component/index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth/auth";
import { useForm } from "react-hook-form";

function Login() {
  console.log("hey this is login");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const login = async (data) => {
    // always empty out error before submission
    setError("");
    setLoading(true);

    try {
      const sessionId = await authService.sessionId();
      const currentSession = sessionId.sessions.find(
        (session) => session.current === true
      );
      const deleteUserSession = await authService.deleteSession();
      console.log("this is deleteSession",deleteSession());

      if (currentSession) {
           deleteUserSession(currentSession.$id)
        console.log("Current session ID:", currentSession.$id);
      }

      // console.log(sessionId);
      const session = await authService.login(data);

      if (session) {
        // userData is coming from authService not from session
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(storeLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to={"/signup"}
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email :"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
                      ? true
                      : "Email must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              placeholder="Enter your password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            <Button type="submit" className="w-full">
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
