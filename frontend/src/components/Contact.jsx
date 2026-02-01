import { Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-light-bg pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-primary mb-4">Get in Touch</h1>
          <p className="text-gray-600">We'd love to hear from you. Here's how you can reach us.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
              <Phone size={24} />
            </div>
            <h3 className="font-bold text-lg mb-2">Phone</h3>
            <p className="text-gray-600">+1 (555) 123-4567</p>
            <p className="text-gray-500 text-sm mt-1">Mon-Fri 9am-6pm</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
              <Mail size={24} />
            </div>
            <h3 className="font-bold text-lg mb-2">Email</h3>
            <p className="text-gray-600">support@blooming.com</p>
            <p className="text-gray-500 text-sm mt-1">Online 24/7</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
              <MapPin size={24} />
            </div>
            <h3 className="font-bold text-lg mb-2">Office</h3>
            <p className="text-gray-600">123 Garden Street</p>
            <p className="text-gray-500 text-sm mt-1">New York, NY 10001</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a message</h2>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input 
                type="email" 
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea 
                rows="4"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                placeholder="How can we help you?"
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full bg-primary text-white font-bold py-4 rounded-lg hover:bg-primary-hover transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
