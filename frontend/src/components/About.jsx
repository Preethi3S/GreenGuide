import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-serif font-bold text-secondary mb-4">About Blooming</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Cultivating a greener future, one plant at a time. We are dedicated to helping you grow your perfect garden with expert guidance and smart tools.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <img 
            src="/images/about.jpg" 
            alt="Our Mission" 
            className="rounded-3xl shadow-xl w-full object-cover h-80"
          />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-serif font-bold text-secondary mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            At Blooming, we believe that everyone has a green thumb waiting to be discovered. Our mission is to demystify plant care through technology, community, and sustainable practices. Whether you're a seasoned gardener or just starting with your first succulent, we're here to support your journey.
          </p>
          <div className="flex gap-4">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-primary">5k+</h3>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Community Members</p>
            </div>
            <div className="text-center border-l border-gray-200 pl-4">
              <h3 className="text-3xl font-bold text-primary">10k+</h3>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Plants Tracked</p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-8 rounded-3xl shadow-lg border border-secondary/5 text-center"
      >
        <h2 className="text-2xl font-serif font-bold text-secondary mb-6">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-xl">🌱</div>
            <h3 className="font-bold text-secondary mb-2">Smart Tracking</h3>
            <p className="text-sm text-gray-500">Automated reminders for water, fertilizer, and repotting.</p>
          </div>
          <div>
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-xl">🤖</div>
            <h3 className="font-bold text-secondary mb-2">AI Diagnosis</h3>
            <p className="text-sm text-gray-500">Instant identification of plant diseases and pests.</p>
          </div>
          <div>
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-xl">🤝</div>
            <h3 className="font-bold text-secondary mb-2">Community</h3>
            <p className="text-sm text-gray-500">Connect with fellow plant lovers and share tips.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
