import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, CheckCircle } from 'lucide-react';
import { Button } from '../Components/ui/button';
import { Input } from '../Components/ui/input';
import { Textarea } from '../Components/ui/textarea';
import { Label } from '../Components/ui/label';

export default function ContactUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      primary: 'info@scientificsquare.in',
      //secondary: 'support@scientificsquare.com'
    },
    /*{
      icon: Phone,
      title: 'Call Us',
      primary: '+91 9958797197',
      secondary: '+91 1234567890'
    },*/
    {
      icon: MapPin,
      title: 'Visit Us',
      primary: '123 Science Park Road',
      secondary: 'New Delhi, India 110001'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      primary: 'Mon - Fri: 9:00 AM - 6:00 PM',
      secondary: 'Sat: 10:00 AM - 2:00 PM'
    }
  ];

  return (
    <main className="pt-20">
      {/* Hero Banner */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center bg-[#002a4b] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#d09b2c]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#9391c7]/10 rounded-full blur-3xl" />
        </div>
        <motion.div
          className="text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-[#9391c7] text-lg">Get in touch with our team of experts</p>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section ref={ref} className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <motion.div
              className="lg:col-span-2 space-y-8"
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div>
                <span className="text-[#d09b2c] font-semibold tracking-wider uppercase text-sm">Get In Touch</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#002a4b] mt-3 mb-4">
                  We'd Love to Hear From You
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Whether you have a question about our products, need technical support, 
                  or want to discuss a custom solution, our team is ready to help.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#002a4b] group-hover:bg-[#d09b2c] flex items-center justify-center flex-shrink-0 transition-colors">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#002a4b] mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.primary}</p>
                      <p className="text-gray-500 text-sm">{item.secondary}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10 relative overflow-hidden">
                {/* Decorative Element */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#d09b2c]/5 rounded-full -translate-y-1/2 translate-x-1/2" />

                {formSubmitted ? (
                  <motion.div
                    className="text-center py-16"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-6">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#002a4b] mb-2">Thank You!</h3>
                    <p className="text-gray-600">We've received your message and will get back to you soon.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-[#002a4b] font-medium">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                          className="border-gray-200 focus:border-[#d09b2c] focus:ring-[#d09b2c]/20 h-12 rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-[#002a4b] font-medium">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                          className="border-gray-200 focus:border-[#d09b2c] focus:ring-[#d09b2c]/20 h-12 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-[#002a4b] font-medium">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 9876543210"
                          className="border-gray-200 focus:border-[#d09b2c] focus:ring-[#d09b2c]/20 h-12 rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-[#002a4b] font-medium">Subject</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Product Inquiry"
                          required
                          className="border-gray-200 focus:border-[#d09b2c] focus:ring-[#d09b2c]/20 h-12 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-[#002a4b] font-medium">Your Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us how we can help you..."
                        required
                        rows={5}
                        className="border-gray-200 focus:border-[#d09b2c] focus:ring-[#d09b2c]/20 rounded-xl resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#002a4b] hover:bg-[#002a4b]/90 text-white h-12 rounded-xl text-lg font-medium group"
                    >
                      Send Message
                      <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section Placeholder */}
      <section className="h-96 bg-gray-200 relative">
        <div className="absolute inset-0 flex items-center justify-center bg-[#002a4b]/5">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-[#002a4b]/30 mx-auto mb-4" />
            <p className="text-gray-500">Interactive Map Coming Soon</p>
          </div>
        </div>
      </section>
    </main>
  );
}