import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, ArrowRight, Clock } from 'lucide-react';
import { Button } from '../Components/ui/button';

const newsItems = [
  {
    id: 1,
    title: 'Scientific Square Partners with Shimadzu for Advanced Spectroscopy Solutions',
    excerpt: 'A new strategic partnership brings cutting-edge spectroscopy technology to research laboratories across India.',
    date: '2024-01-15',
    category: 'Partnership',
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&q=80',
    readTime: '5 min read'
  },
  {
    id: 2,
    title: 'Launching New PCR Thermal Cycler Series for Molecular Diagnostics',
    excerpt: 'Our latest addition to the molecular biology range offers unprecedented accuracy and speed for DNA amplification.',
    date: '2024-01-10',
    category: 'Product Launch',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80',
    readTime: '4 min read'
  },
  {
    id: 3,
    title: 'Scientific Square Exhibits at Analytica India 2024',
    excerpt: 'Visit our booth at India\'s premier exhibition for analysis, laboratory technology, and biotechnology.',
    date: '2024-01-05',
    category: 'Event',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
    readTime: '3 min read'
  },
  {
    id: 4,
    title: 'Workshop: Best Practices in Laboratory Equipment Maintenance',
    excerpt: 'Join our expert technicians for a comprehensive workshop on extending the life of your lab equipment.',
    date: '2023-12-20',
    category: 'Workshop',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&q=80',
    readTime: '6 min read'
  },
  {
    id: 5,
    title: 'Achieving ISO 9001:2015 Recertification',
    excerpt: 'Scientific Square proudly announces successful recertification, reaffirming our commitment to quality management.',
    date: '2023-12-15',
    category: 'Achievement',
    image: 'https://images.unsplash.com/photo-1581093458791-9d58246e8c4b?w=600&q=80',
    readTime: '3 min read'
  },
  {
    id: 6,
    title: 'Expanding Our Service Network Across South India',
    excerpt: 'New service centers in Bangalore, Chennai, and Hyderabad ensure faster support for our customers.',
    date: '2023-12-01',
    category: 'Expansion',
    image: 'https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=600&q=80',
    readTime: '4 min read'
  }
];

const categoryColors = {
  'Partnership': 'bg-[#d09b2c]/10 text-[#d09b2c]',
  'Product Launch': 'bg-[#9391c7]/10 text-[#9391c7]',
  'Event': 'bg-green-100 text-green-700',
  'Workshop': 'bg-blue-100 text-blue-700',
  'Achievement': 'bg-amber-100 text-amber-700',
  'Expansion': 'bg-purple-100 text-purple-700'
};

export default function NewsEvents() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <main className="pt-20">
      {/* Hero Banner */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center bg-[#002a4b] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#d09b2c]/10 rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#9391c7]/10 rounded-full -translate-x-1/2 translate-y-1/2" />
        </div>
        <motion.div
          className="text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">News & Events</h1>
          <p className="text-[#9391c7] text-lg">Stay updated with our latest announcements</p>
        </motion.div>
      </section>

      {/* News Grid */}
      <section ref={ref} className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Article */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="grid lg:grid-cols-2 gap-8 bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
              <div className="aspect-[4/3] lg:aspect-auto overflow-hidden">
                <img
                  src={newsItems[0].image}
                  alt={newsItems[0].title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[newsItems[0].category]}`}>
                    {newsItems[0].category}
                  </span>
                  <span className="text-gray-500 text-sm flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {newsItems[0].readTime}
                  </span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-[#002a4b] mb-4 hover:text-[#d09b2c] transition-colors cursor-pointer">
                  {newsItems[0].title}
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {newsItems[0].excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{formatDate(newsItems[0].date)}</span>
                  </div>
                  <Button variant="ghost" className="text-[#d09b2c] hover:text-[#d09b2c] hover:bg-[#d09b2c]/10 group">
                    Read More
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* News Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.slice(1).map((news, idx) => (
              <motion.article
                key={news.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[news.category]}`}>
                      {news.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(news.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {news.readTime}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#002a4b] mb-3 line-clamp-2 group-hover:text-[#d09b2c] transition-colors cursor-pointer">
                    {news.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {news.excerpt}
                  </p>
                  <Button variant="ghost" className="p-0 h-auto text-[#d09b2c] hover:text-[#d09b2c] hover:bg-transparent group/btn">
                    Read More
                    <ArrowRight className="ml-1 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Load More */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            <Button variant="outline" className="border-[#002a4b] text-[#002a4b] hover:bg-[#002a4b] hover:text-white px-8">
              Load More Articles
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}