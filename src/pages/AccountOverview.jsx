import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const AccountOverview = () => {
  const location = useLocation();
  const { phoneNumber } = location.state || {};

  const items = [
    {
      title: "Your Orders",
      description: "Track, return, or buy things again",
      icon: "📦",
      link: "/orders",
    },
    {
      title: "Your Wishlist",
      description: "View and manage your saved items",
      icon: "💖",
      link: "/wishlist",
    },
    {
      title: "Saved Addresses",
      description: "Edit addresses for orders and gifts",
      icon: "📍",
      link: "/addresses",
    },
    {
      title: "Profile Settings",
      description: "Edit login, name, and mobile number",
      icon: "🔒",
      link: "/profile-settings",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-pink-50 via-white to-blue-50 flex flex-col items-center py-20 px-4">
      <h1 className="text-3xl font-medium">Your Account</h1>
      <span className="mt-2 mb-10 text-gray-600">{phoneNumber}</span>

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
