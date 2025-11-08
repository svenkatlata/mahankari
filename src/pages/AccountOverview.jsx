import { Link } from "react-router-dom";

const AccountOverview = () => {
  const items = [
    {
      title: "Your Orders",
      description: "Track, return, or buy things again",
      icon: "📦",
      link: "/orders",
    },
    {
      title: "Login & security",
      description: "Edit login, name, and mobile number",
      icon: "🔒",
      link: "/login-security",
    },
    {
      title: "Your Addresses",
      description: "Edit addresses for orders and gifts",
      icon: "📍",
      link: "/addresses",
    },
    {
      title: "Your business account",
      description:
        "Sign up for free to save up to 18% with GST invoice and bulk discounts and purchase on credit.",
      icon: "💼",
      link: "/business-account",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4 pt-40">
      <h1 className="text-2xl font-semibold mb-8">Your Account</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl w-full">
        {items.map((item) => (
          <Link
            to={item.link}
            key={item.title}
            className="flex items-start gap-4 bg-white rounded-2xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition"
          >
            <div className="text-3xl">{item.icon}</div>
            <div>
              <h2 className="font-medium text-lg mb-1">{item.title}</h2>
              <p className="text-sm text-gray-600 leading-snug">
                {item.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AccountOverview;
