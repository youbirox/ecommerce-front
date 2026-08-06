import { useState } from "react";

import { getCurrentUser, login } from "../features/auth/authApi";
import { useAppDispatch } from "../app/hooks";
import { loginSuccess, setUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await login({
        email,
        password,
      });

      console.log("JWT TOKEN :", response.token);

      dispatch(loginSuccess(response));
      const user = await getCurrentUser();
      dispatch(setUser(user));
      console.log("JWT TOKEN :", user);
      navigate("/products");
    } catch (err) {
      console.error(err);

      setError("Email ou mot de passe incorrect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Login
        </h1>

        {error && (
          <div className="mb-4 rounded bg-red-100 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="w-full rounded-lg border px-4 py-2 outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full rounded-lg border px-4 py-2 outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
