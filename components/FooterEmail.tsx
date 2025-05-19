import { useState } from 'react';

const EmailSubscription = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    console.log('Subscribed with email:', email);
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <div className="max-w-md mx-auto p-4">
      {isSubscribed ? (
        <div className="text-center text-green-600">
          Thank you for subscribing!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <div className="flex ">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-lg bg-radial-[at_25%_25%] from-white to-zinc-900 to-75% focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-50"
              placeholder="your@email.com"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Subscribe
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EmailSubscription;