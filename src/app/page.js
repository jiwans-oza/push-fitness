"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Menu,
  X,
  Clock,
  Dumbbell,
  Users,
  Star,
  Calendar,
  ChevronRight,
  Award,
} from "lucide-react"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6 },
  },
}

const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6 },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
}

// Custom animation hook
function useScrollAnimation(threshold = 0.2) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: threshold })

  return [ref, isInView]
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Animation refs
  const [heroRef, heroInView] = useScrollAnimation()
  const [aboutRef, aboutInView] = useScrollAnimation()
  const [servicesRef, servicesInView] = useScrollAnimation()
  const [galleryRef, galleryInView] = useScrollAnimation()
  const [ctaRef, ctaInView] = useScrollAnimation()

  // Handle scroll for sticky header and scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Smooth scroll function
  const scrollToSection = (id) => {
    setIsMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  // Shop data
  const shopData = {
    name: "Push Fitness",
    category: "Gym",
    location: "Albany, NY",
    address: "Albany, NY",
    phone: "+15184230155",
    services: "",
    hours: {
      weekdays: "Not specified",
      saturday: "Not specified",
      sunday: "Not specified",
    },
    servicesList: [
      {
        name: "Gym Membership",
        price: "Contact for pricing",
        description: "Access to state-of-the-art fitness equipment",
        img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop",
      },
      {
        name: "Personal Training",
        price: "Contact for pricing",
        description: "One-on-one training sessions",
        img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000&auto=format&fit=crop",
      },
      {
        name: "Group Classes",
        price: "Contact for pricing",
        description: "Various fitness classes for all levels",
        img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1000&auto=format&fit=crop",
      },
      {
        name: "Fitness Assessment",
        price: "Contact for pricing",
        description: "Comprehensive fitness evaluation",
        img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000&auto=format&fit=crop",
      },
    ],
    gallery: ["Gym Membership", "Personal Training", "Group Classes", "Fitness Assessment"],
    testimonials: [
      {
        name: "Member 1",
        text: "Great facility and supportive environment!",
        rating: 5,
        image: "M1",
      },
      {
        name: "Member 2",
        text: "Best gym in Albany!",
        rating: 5,
        image: "M2",
      },
      {
        name: "Member 3",
        text: "Amazing community and results!",
        rating: 5,
        image: "M3",
      },
    ],
  }

  // Current testimonial index
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  // Next testimonial
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === shopData.testimonials.length - 1 ? 0 : prev + 1))
  }

  // Previous testimonial
  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? shopData.testimonials.length - 1 : prev - 1))
  }

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* Decorative elements */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-600 via-amber-500 to-emerald-600 z-50"></div>

      {/* Header */}
      <header
        className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? "bg-gray-900/95 backdrop-blur-sm text-white shadow-lg py-3" : "bg-gray-900/50 backdrop-blur-sm text-white py-6"
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold">
              {shopData.name}
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection("about")} className="hover:text-emerald-400 transition-colors">
                About
              </button>
              <button onClick={() => scrollToSection("services")} className="hover:text-emerald-400 transition-colors">
                Services
              </button>
              <button onClick={() => scrollToSection("gallery")} className="hover:text-emerald-400 transition-colors">
                Gallery
              </button>
              <button onClick={() => scrollToSection("contact")} className="hover:text-emerald-400 transition-colors">
                Contact
              </button>
              <a
                href={`tel:${shopData.phone}`}
                className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-full transition-colors"
              >
                <Phone size={16} />
                <span>Call Us</span>
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white hover:text-emerald-400 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-900/95 backdrop-blur-sm text-white border-t border-emerald-600/20"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              <button
                onClick={() => scrollToSection("about")}
                className="font-medium capitalize py-3 hover:text-emerald-400 transition-colors text-left flex justify-between items-center"
              >
                About
                <ChevronRight className="h-4 w-4 text-emerald-500" />
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="font-medium capitalize py-3 hover:text-emerald-400 transition-colors text-left flex justify-between items-center"
              >
                Services
                <ChevronRight className="h-4 w-4 text-emerald-500" />
              </button>
              <button
                onClick={() => scrollToSection("gallery")}
                className="font-medium capitalize py-3 hover:text-emerald-400 transition-colors text-left flex justify-between items-center"
              >
                Gallery
                <ChevronRight className="h-4 w-4 text-emerald-500" />
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="font-medium capitalize py-3 hover:text-emerald-400 transition-colors text-left flex justify-between items-center"
              >
                Contact
                <ChevronRight className="h-4 w-4 text-emerald-500" />
              </button>
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-emerald-600 hover:bg-emerald-700 text-white w-full mt-2 rounded-full"
              >
                Book Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section
        id="home"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center text-white overflow-hidden"
      >
        {/* Background with overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000&auto=format&fit=crop"
            alt="Modern gym interior"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 100vw"
            quality={100}
            className="object-cover brightness-[0.3]"
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              width: '100%',
              height: '100%',
              position: 'absolute',
            }}
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50"></div>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="text-left"
            >
              <motion.div
                variants={fadeIn}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600/20 backdrop-blur-sm rounded-full mb-6"
              >
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                <span className="text-emerald-400 font-semibold">Welcome to {shopData.name}</span>
              </motion.div>
              
              <motion.h1
                variants={fadeIn}
                className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              >
                Transform Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-amber-500 mt-2">Body & Mind</span>
              </motion.h1>

              <motion.p
                variants={fadeIn}
                className="text-xl text-gray-300 mb-8 max-w-xl"
              >
                Join Albany's premier fitness destination. State-of-the-art equipment, expert trainers, and a supportive community await you.
              </motion.p>

              <motion.div 
                variants={fadeIn} 
                className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
              >
                <a
                  href={`tel:${shopData.phone}`}
                  className="bg-gradient-to-r from-emerald-600 to-amber-600 hover:from-emerald-700 hover:to-amber-700 text-white px-8 py-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2 text-lg font-semibold shadow-lg hover:shadow-emerald-500/25 hover:scale-105"
                >
                  <Phone className="h-5 w-5" />
                  <span>Start Your Journey</span>
                </a>
                <button
                  onClick={() => scrollToSection("services")}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full transition-all duration-300 text-lg font-semibold border-2 border-white/20 hover:border-emerald-500 hover:text-emerald-400"
                >
                  Explore Programs
                </button>
              </motion.div>

              {/* Stats Section */}
              <motion.div
                variants={fadeIn}
                className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6"
              >
                <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-amber-500 mb-1">500+</div>
                  <div className="text-sm text-gray-400">Active Members</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-amber-500 mb-1">20+</div>
                  <div className="text-sm text-gray-400">Expert Trainers</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-amber-500 mb-1">50+</div>
                  <div className="text-sm text-gray-400">Weekly Classes</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-amber-500 mb-1">24/7</div>
                  <div className="text-sm text-gray-400">Access</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Feature Cards */}
            <motion.div
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="hidden lg:block"
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    title: "Personal Training",
                    description: "One-on-one sessions with expert trainers",
                    icon: <Users className="h-6 w-6" />,
                  },
                  {
                    title: "Group Classes",
                    description: "Dynamic group workouts for all levels",
                    icon: <Users className="h-6 w-6" />,
                  },
                  {
                    title: "Modern Equipment",
                    description: "State-of-the-art fitness technology",
                    icon: <Dumbbell className="h-6 w-6" />,
                  },
                  {
                    title: "24/7 Access",
                    description: "Work out on your schedule",
                    icon: <Clock className="h-6 w-6" />,
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={scaleIn}
                    className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-emerald-500/50 transition-all duration-300 group"
                  >
                    <div className="p-3 bg-gradient-to-br from-emerald-600/20 to-amber-600/20 rounded-xl w-fit mb-4 group-hover:from-emerald-600/30 group-hover:to-amber-600/30 transition-colors">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            variants={fadeIn}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-sm text-gray-400">Scroll to explore</span>
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="w-6 h-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-amber-500"
            >
              <ChevronRight className="w-6 h-6 transform rotate-90" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-16 md:py-24 bg-gray-50 relative overflow-hidden"
        ref={aboutRef}
      >
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-emerald-50 opacity-70"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-amber-50 opacity-70"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            animate={aboutInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <motion.div variants={fadeIn} className="text-center mb-12 md:mb-16">
              <span className="inline-block px-3 md:px-4 py-1 bg-emerald-100 text-emerald-800 text-xs md:text-sm font-semibold rounded-full mb-4">
                About Us
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
                Building <span className="text-emerald-600">Strength</span> Since 2010
              </h2>
              <div className="w-24 h-1 bg-emerald-600 mx-auto"></div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <motion.div variants={fadeInLeft} className="relative">
                <div className="relative h-[300px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000&auto=format&fit=crop"
                    alt="Professional trainer helping client"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <p className="text-2xl font-bold mb-2">10+ Years of Excellence</p>
                    <p className="text-white/90">Serving the Denton community with pride</p>
                  </div>
                </div>
                <div className="absolute -bottom-4 md:-bottom-6 -right-4 md:-right-6 bg-emerald-600 text-white p-4 md:p-6 rounded-xl shadow-xl">
                  <div className="flex items-center gap-2 md:gap-3">
                    <Award className="h-6 md:h-8 w-6 md:w-8" />
                    <div>
                      <p className="text-xl md:text-2xl font-bold">5000+</p>
                      <p className="text-xs md:text-sm">Happy Clients</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeInRight} className="space-y-6 md:space-y-8">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">Denton&apos;s Premier Barbershop Experience</h3>
                  <p className="text-gray-800 text-base md:text-lg leading-relaxed">
                    At {shopData.name}, we focus on clean haircuts, premium grooming, and top-tier local customer service.
                    Our skilled barbers combine modern style with vintage charm to give you the perfect look.
                  </p>
                </div>

                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-start gap-4 p-5 bg-white rounded-xl shadow-md border-l-4 border-emerald-600 hover:shadow-lg transition-shadow">
                    <div className="p-3 bg-emerald-100 rounded-full text-emerald-600">
                      <Award className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">Premium Quality</h4>
                      <p className="text-gray-700">Top-tier service guaranteed with attention to detail</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-5 bg-white rounded-xl shadow-md border-l-4 border-emerald-600 hover:shadow-lg transition-shadow">
                    <div className="p-3 bg-emerald-100 rounded-full text-emerald-600">
                      <Users className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">Expert Barbers</h4>
                      <p className="text-gray-700">Skilled professionals with years of experience</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-5 bg-white rounded-xl shadow-md border-l-4 border-emerald-600 hover:shadow-lg transition-shadow">
                    <div className="p-3 bg-emerald-100 rounded-full text-emerald-600">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">Convenient Hours</h4>
                      <p className="text-gray-700">Flexible scheduling to fit your busy lifestyle</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    onClick={() => scrollToSection("services")}
                    className="bg-black hover:bg-gray-800 text-white rounded-full px-6 md:px-8 py-5 md:py-6 text-base md:text-lg"
                  >
                    Explore Our Services
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24 bg-gray-900 text-white relative" ref={servicesRef}>
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-600 via-amber-500 to-emerald-600"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 border-2 border-emerald-600 rounded-full"></div>
          <div className="absolute bottom-40 right-10 w-48 h-48 border-2 border-emerald-600 rounded-full"></div>
          <div className="absolute top-1/3 right-1/4 w-16 h-16 border-2 border-emerald-600 rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial="hidden" animate={servicesInView ? "visible" : "hidden"} variants={staggerContainer}>
            <motion.div variants={fadeIn} className="text-center mb-12 md:mb-16">
              <span className="inline-block px-3 md:px-4 py-1 bg-emerald-600/20 text-emerald-400 text-xs md:text-sm font-semibold rounded-full mb-4">
                Our Services
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Premium <span className="text-emerald-500">Fitness</span> Services
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
                Experience the perfect blend of traditional barbering techniques and modern styling
              </p>
              <div className="w-24 h-1 bg-emerald-600 mx-auto mt-6"></div>
            </motion.div>

            <motion.div variants={staggerContainer} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {shopData.servicesList.map((service, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="bg-gray-800 rounded-2xl overflow-hidden border border-emerald-600/20 group"
                >
                  <div className="h-48 relative">
                    <Image
                      src={service.img}
                      alt={service.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      quality={90}
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-xl font-bold text-white mb-1">{service.name}</h3>
                      <p className="text-2xl font-bold text-emerald-500">{service.price}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-400 mb-6 min-h-[48px]">{service.description}</p>
                    <Button
                      onClick={() => scrollToSection("contact")}
                      className="w-full bg-transparent hover:bg-emerald-600 text-emerald-500 hover:text-white border border-emerald-500 hover:border-transparent rounded-full transition-colors group-hover:scale-105"
                    >
                      Book Now
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Additional Info */}
            <motion.div variants={fadeIn} className="mt-12 md:mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-emerald-600/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-emerald-600/20 rounded-full">
                    <Clock className="h-6 w-6 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-bold">Duration</h3>
                </div>
                <p className="text-gray-400">Each session is tailored to your fitness goals and schedule.</p>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-emerald-600/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-emerald-600/20 rounded-full">
                    <Award className="h-6 w-6 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-bold">Quality</h3>
                </div>
                <p className="text-gray-400">We use premium products and tools to ensure the best results for every client.</p>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-emerald-600/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-emerald-600/20 rounded-full">
                    <Users className="h-6 w-6 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-bold">Experience</h3>
                </div>
                <p className="text-gray-400">Our skilled barbers have years of experience in creating the perfect look for you.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16 md:py-24 bg-gray-50 relative overflow-hidden" ref={galleryRef}>
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-emerald-50 opacity-70"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-amber-50 opacity-70"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial="hidden" animate={galleryInView ? "visible" : "hidden"} variants={staggerContainer}>
            <motion.div variants={fadeIn} className="text-center mb-12 md:mb-16">
              <span className="inline-block px-3 md:px-4 py-1 bg-emerald-100 text-emerald-800 text-xs md:text-sm font-semibold rounded-full mb-4">
                Our Gallery
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
                Showcase of Our <span className="text-emerald-600">Facility</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
                Browse through our collection of exceptional haircuts and styles
              </p>
              <div className="w-24 h-1 bg-emerald-600 mx-auto mt-6"></div>
            </motion.div>

            <motion.div variants={staggerContainer} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {shopData.servicesList.map((service, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                  className="relative group overflow-hidden rounded-2xl shadow-lg aspect-square"
                >
                  <Image
                    src={service.img}
                    alt={service.name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    quality={90}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                    <div className="bg-black/50 backdrop-blur-sm p-4 rounded-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-white font-bold text-xl mb-2">
                        {service.name}
                      </h3>
                      <p className="text-emerald-400 text-sm font-medium">
                        {service.price}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeIn} className="mt-12 md:mt-16 text-center">
              <div className="inline-flex items-center gap-3 md:gap-4 bg-white rounded-full shadow-lg px-4 md:px-6 py-2 md:py-3">
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white bg-emerald-600 flex items-center justify-center text-white text-xs font-bold">
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <p className="text-gray-700 text-sm md:text-base font-medium">Join our satisfied customers</p>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="text-center mt-8 md:mt-12">
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6 md:px-8 py-5 md:py-6 text-base md:text-lg group shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  Book Your Style Today
                  <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        ref={ctaRef}
        className="relative py-20 bg-gray-900 text-white"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate={ctaInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h2
              variants={fadeIn}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Get in Touch
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-lg text-gray-300 mb-8"
            >
              Visit us today for a professional hair care experience
            </motion.p>
            <motion.div
              variants={fadeIn}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
            >
              <div className="bg-white/5 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="h-6 w-6 text-emerald-500" />
                  <h3 className="text-xl font-semibold">Location</h3>
                </div>
                <p className="text-gray-300">{shopData.address}</p>
              </div>
              <div className="bg-white/5 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Phone className="h-6 w-6 text-emerald-500" />
                  <h3 className="text-xl font-semibold">Phone</h3>
                </div>
                <a
                  href={`tel:${shopData.phone}`}
                  className="text-gray-300 hover:text-emerald-500 transition-colors"
                >
                  {shopData.phone}
                </a>
              </div>
            </motion.div>
            <motion.div variants={fadeIn}>
              <a
                href={`tel:${shopData.phone}`}
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full transition-colors"
              >
                <Phone className="h-5 w-5" />
                <span>Call Now</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[300px] md:h-[500px] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-600/20 to-transparent z-10"></div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d214587.6003651566!2d-97.195555!3d33.214841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c3b6c1c0c1c1f%3A0x1c3c3c3c3c3c3c3c!2sDenton%2C%20TX%2C%20USA!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 z-0"
        ></iframe>
        <div className="absolute inset-0 bg-black/30 z-20 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-4">Visit Us Today</h3>
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-8 py-6 text-lg group shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => window.open("https://www.google.com/maps/search/?api=1&query=Denton+TX+United+States", "_blank")}
            >
              <MapPin className="h-5 w-5 mr-2" />
              Get Directions
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 md:py-16 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-600 via-amber-500 to-emerald-600"></div>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 border-2 border-emerald-600 rounded-full"></div>
          <div className="absolute bottom-40 right-10 w-48 h-48 border-2 border-emerald-600 rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center">
                  <Dumbbell className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-2xl">{shopData.name}</h3>
                  <p className="text-emerald-500">EST. 2010</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Premium barber services in Denton, Texas. Clean cuts, premium grooming, and top-tier customer service.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-emerald-600 p-3 rounded-full transition-all duration-300 hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-emerald-600 p-3 rounded-full transition-all duration-300 hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {["home", "about", "services", "gallery", "contact"].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => scrollToSection(item)}
                      className="text-gray-400 hover:text-emerald-500 transition-colors capitalize flex items-center gap-2 group"
                    >
                      <ChevronRight className="h-4 w-4 text-emerald-600 group-hover:translate-x-1 transition-transform" />
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-6">Contact Info</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-emerald-600 mt-1" />
                  <div>
                    <p className="text-gray-400">Phone</p>
                    <a href={`tel:${shopData.phone}`} className="hover:text-emerald-500 transition-colors">
                      {shopData.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-emerald-600 mt-1" />
                  <div>
                    <p className="text-gray-400">Address</p>
                    <p className="text-white">{shopData.location}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-emerald-600 mt-1" />
                  <div>
                    <p className="text-gray-400">Hours</p>
                    <div className="text-white space-y-1">
                      <p>Mon-Fri: {shopData.hours.weekdays}</p>
                      <p>Saturday: {shopData.hours.saturday}</p>
                      <p>Sunday: {shopData.hours.sunday}</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 md:mt-12 pt-6 md:pt-8 text-center">
            <p className="text-gray-500 text-xs md:text-sm">
              &copy; {new Date().getFullYear()} {shopData.name}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: showScrollTop ? 1 : 0,
          scale: showScrollTop ? 1 : 0.5
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className="fixed bottom-4 md:bottom-8 right-4 md:right-8 z-50 bg-emerald-600 text-white p-3 md:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
        aria-label="Scroll to top"
      >
        <div className="relative w-5 h-5 md:w-6 md:h-6">
          <Dumbbell className="w-5 h-5 md:w-6 md:h-6 transform group-hover:rotate-12 transition-transform duration-300" />
          <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300"></div>
        </div>
      </motion.button>
    </main>
  )
}
