function Register() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Create Account
        </h1>

        <form className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">Username</label>

            <input
              type="text"
              placeholder="Username"
              className="w-full rounded-lg border px-4 py-2"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>

            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-lg border px-4 py-2"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Password</label>

            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-lg border px-4 py-2"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
