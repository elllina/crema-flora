import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Dimensions,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";

const { width } = Dimensions.get("window");

// Brand Colors from logo
const COLORS = {
  teal: "#2A6B6B",
  orange: "#E86A33",
  yellow: "#F5C542",
  cream: "#FFF9F0",
  white: "#FFFFFF",
};

// Logo image
const logoImage = require("./assets/logo.png");

// Cake images
const cakeImages = {
  vanilla: require("./assets/cakes/stardart-busquite.png"),
  chocolate: require("./assets/cakes/cocoa.png"),
  strawberry: require("./assets/cakes/mac-strawberry.png"),
  caramel: require("./assets/cakes/nejnost.png"),
  lemon: require("./assets/cakes/limon.png"),
  redVelvet: require("./assets/cakes/red-welwet.png"),
};

// Translations
const translations = {
  en: {
    nav: {
      home: "Home",
      cakes: "Our Cakes",
      order: "How to Order",
      contact: "Contact",
    },
    hero: {
      subtitle: "Artisan cakes crafted with love and passion",
      description:
        "Every cake tells a story. Let us create yours with the finest ingredients and artistic flair that makes each celebration unforgettable.",
    },
    cakes: {
      title: "Our Creations",
      items: [
        {
          name: "Classic Vanilla Dream",
          description: "Light and fluffy vanilla sponge with silky buttercream frosting",
          price: "$45",
          image: cakeImages.vanilla,
        },
        {
          name: "Chocolate Paradise",
          description: "Rich dark chocolate layers with ganache and chocolate shavings",
          price: "$55",
          image: cakeImages.chocolate,
        },
        {
          name: "Strawberry Bliss",
          description: "Fresh strawberries with cream cheese frosting on vanilla base",
          price: "$50",
          image: cakeImages.strawberry,
        },
        {
          name: "Caramel Delight",
          description: "Salted caramel drizzle over moist caramel cake layers",
          price: "$52",
          image: cakeImages.caramel,
        },
        {
          name: "Lemon Zest",
          description: "Tangy lemon curd filling with light meringue frosting",
          price: "$48",
          image: cakeImages.lemon,
        },
        {
          name: "Red Velvet Romance",
          description: "Classic red velvet with cream cheese frosting and white chocolate",
          price: "$58",
          image: cakeImages.redVelvet,
        },
      ],
    },
    order: {
      title: "How to Order",
      steps: [
        {
          title: "Choose Your Cake",
          description:
            "Browse our selection and pick your favorite flavor and design, or let us create something custom just for you.",
        },
        {
          title: "Contact Us",
          description:
            "Reach out via phone, email, or Instagram to discuss your order details, size, and any special requests.",
        },
        {
          title: "Confirm & Pay",
          description:
            "We'll send you a quote. A 50% deposit secures your order, with the balance due on pickup.",
        },
        {
          title: "Enjoy!",
          description:
            "Pick up your cake or have it delivered. Get ready to celebrate with a delicious masterpiece!",
        },
      ],
      button: "Get in Touch",
    },
    footer: {
      tagline: "Made with love in every layer",
      copyright: "© 2026 Crema Flora. All rights reserved.",
    },
  },
  hy: {
    nav: {
      home: "Գլխավոր",
      cakes: "Մեր Տորթերը",
      order: "Ինչպես Պատվիրել",
      contact: "Կապ",
    },
    hero: {
      subtitle: "Արհեստավարական տորթեր՝ պատրաստված սիրով և կրքով",
      description:
        "Յուրաքանչյур տորթ պատմություն ունի։ Թույլ տվեք մեզ ստեղծել ձերը լավագույն բաղադրիչներով և արվեստագիտական ոճով, որը յուրաքանչյուր տոնակատարությունը դարձնում է անմոռանալի։",
    },
    cakes: {
      title: "Մեր Ստեղծագործությունները",
      items: [
        {
          name: "Դասական Վանիլային Երազանք",
          description: "Թեթև և փափուկ վանիլային բիսկվիտ՝ մետաքսային կարագի կրեմով",
          price: "$45",
          image: cakeImages.vanilla,
        },
        {
          name: "Շոկոլադե Դրախտ",
          description: "Հարուստ մուգ շոկոլադե շերտեր՝ գանաշով և շոկոլադե սայրուկներով",
          price: "$55",
          image: cakeImages.chocolate,
        },
        {
          name: "Ելակային Երանություն",
          description: "Թարմ ելակներ՝ քրեմ-պանրի կրեմով վանիլային բազայի վրա",
          price: "$50",
          image: cakeImages.strawberry,
        },
        {
          name: "Կարամելային Հաճույք",
          description: "Աղի կարամելային մրգախառնուրդ՝ խոնավ կարամելային շերտերի վրա",
          price: "$52",
          image: cakeImages.caramel,
        },
        {
          name: "Լիմոնի Համ",
          description: "Թթու լիմոնի կրեմ՝ թեթև բեզեի կրեմով",
          price: "$48",
          image: cakeImages.lemon,
        },
        {
          name: "Կարմիր Թավշյա Ռոմանտիկա",
          description: "Դասական կարմիր թավշ՝ քրեմ-պանրի կրեմով և սպիտակ շոկոլադով",
          price: "$58",
          image: cakeImages.redVelvet,
        },
      ],
    },
    order: {
      title: "Ինչպես Պատվիրել",
      steps: [
        {
          title: "Ընտրեք Ձեր Տորթը",
          description:
            "Զննեք մեր տեսականին և ընտրեք ձեր սիրելի համը և դիզայնը, կամ թույլ տվեք մեզ ստեղծել հատուկ ձեզ համար։",
        },
        {
          title: "Կապվեք Մեզ Հետ",
          description:
            "Կապվեք հեռախոսով, էլփոստով կամ Instagram-ի միջոցով՝ քննարկելու ձեր պատվերի մանրամասները, չափսը և հատուկ պահանջները։",
        },
        {
          title: "Հաստատեք և Վճարեք",
          description:
            "Մենք կուղարկենք ձեզ գնահատական։ 50% կանխավճարը ապահովում է ձեր պատվերը, մնացածը վճարվում է վերցնելիս։",
        },
        {
          title: "Վայելեք!",
          description:
            "Վերցրեք ձեր տորթը կամ պատվիրեք առաքում։ Պատրաստվեք տոնել համեղ գլուխգործոցով!",
        },
      ],
      button: "Կապվել",
    },
    footer: {
      tagline: "Պատրաստված սիրով յուրաքանչյուր շերտում",
      copyright: "© 2026 Քրեմա Ֆլորա։ Բոլոր իրավունքները պաշտպանված են։",
    },
  },
  ru: {
    nav: {
      home: "Главная",
      cakes: "Наши Торты",
      order: "Как Заказать",
      contact: "Контакты",
    },
    hero: {
      subtitle: "Авторские торты, созданные с любовью и страстью",
      description:
        "Каждый торт рассказывает историю. Позвольте нам создать вашу с лучшими ингредиентами и художественным чутьем, которые сделают каждое празднование незабываемым.",
    },
    cakes: {
      title: "Наши Творения",
      items: [
        {
          name: "Классическая Ванильная Мечта",
          description: "Легкий и пушистый ванильный бисквит с шелковистым масляным кремом",
          price: "$45",
          image: cakeImages.vanilla,
        },
        {
          name: "Шоколадный Рай",
          description: "Насыщенные слои темного шоколада с ганашем и шоколадной стружкой",
          price: "$55",
          image: cakeImages.chocolate,
        },
        {
          name: "Клубничное Блаженство",
          description: "Свежая клубника со сливочно-сырным кремом на ванильной основе",
          price: "$50",
          image: cakeImages.strawberry,
        },
        {
          name: "Карамельное Наслаждение",
          description: "Соленая карамель на влажных карамельных коржах",
          price: "$52",
          image: cakeImages.caramel,
        },
        {
          name: "Лимонная Свежесть",
          description: "Терпкий лимонный крем с легкой меренгой",
          price: "$48",
          image: cakeImages.lemon,
        },
        {
          name: "Романтика Красного Бархата",
          description: "Классический красный бархат со сливочно-сырным кремом и белым шоколадом",
          price: "$58",
          image: cakeImages.redVelvet,
        },
      ],
    },
    order: {
      title: "Как Заказать",
      steps: [
        {
          title: "Выберите Торт",
          description:
            "Просмотрите наш ассортимент и выберите любимый вкус и дизайн, или позвольте нам создать что-то индивидуальное для вас.",
        },
        {
          title: "Свяжитесь с Нами",
          description:
            "Свяжитесь по телефону, электронной почте или Instagram, чтобы обсудить детали заказа, размер и особые пожелания.",
        },
        {
          title: "Подтвердите и Оплатите",
          description:
            "Мы вышлем вам расчет. Предоплата 50% гарантирует ваш заказ, остаток оплачивается при получении.",
        },
        {
          title: "Наслаждайтесь!",
          description:
            "Заберите торт или закажите доставку. Готовьтесь праздновать с восхитительным шедевром!",
        },
      ],
      button: "Связаться",
    },
    footer: {
      tagline: "Сделано с любовью в каждом слое",
      copyright: "© 2026 Крема Флора. Все права защищены.",
    },
  },
};

// Language Switcher Component
const LanguageSwitcher = ({ currentLang, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const languages = [
    { code: "en", label: "EN", flag: "🇬🇧" },
    { code: "hy", label: "ՀՅ", flag: "🇦🇲" },
    { code: "ru", label: "РУ", flag: "🇷🇺" },
  ];

  const currentLanguage = languages.find((lang) => lang.code === currentLang);

  const handlePress = (langCode) => {
    onLanguageChange(langCode);
    setIsOpen(false);
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.languageSwitcher}>
      <TouchableOpacity
        style={styles.languageButton}
        onPress={() => setIsOpen(!isOpen)}
        activeOpacity={0.8}
      >
        <Text style={styles.languageFlag}>{currentLanguage.flag}</Text>
        <Text style={styles.languageLabel}>{currentLanguage.label}</Text>
        <Text style={styles.languageArrow}>{isOpen ? "▲" : "▼"}</Text>
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.languageDropdown}>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.languageOption,
                lang.code === currentLang && styles.languageOptionActive,
              ]}
              onPress={() => handlePress(lang.code)}
            >
              <Text style={styles.languageFlag}>{lang.flag}</Text>
              <Text
                style={[
                  styles.languageOptionLabel,
                  lang.code === currentLang && styles.languageOptionLabelActive,
                ]}
              >
                {lang.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

// Header Component
const Header = ({ onNavigate, currentLang, onLanguageChange, scrollY }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const t = translations[currentLang];

  const headerBg = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: ["rgba(255, 249, 240, 0)", "rgba(255, 249, 240, 0.98)"],
    extrapolate: "clamp",
  });

  const headerShadow = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 0.15],
    extrapolate: "clamp",
  });

  const menuItems = [
    { key: "home", label: t.nav.home },
    { key: "cakes", label: t.nav.cakes },
    { key: "order", label: t.nav.order },
  ];

  return (
    <Animated.View
      style={[
        styles.header,
        {
          backgroundColor: headerBg,
          ...Platform.select({
            web: {
              boxShadow: headerShadow.interpolate({
                inputRange: [0, 1],
                outputRange: [
                  "0 0 0 rgba(42, 107, 107, 0)",
                  "0 2px 20px rgba(42, 107, 107, 0.15)",
                ],
              }),
            },
            default: {
              shadowColor: COLORS.teal,
              shadowOpacity: headerShadow,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 10,
              elevation: headerShadow.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 5],
              }),
            },
          }),
        },
      ]}
    >
      <View style={styles.headerContent}>
        <TouchableOpacity onPress={() => onNavigate("home")}>
          <Text style={styles.headerLogo}>Crema Flora</Text>
        </TouchableOpacity>

        {width > 768 ? (
          <View style={styles.headerNav}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.key}
                style={styles.navItem}
                onPress={() => onNavigate(item.key)}
              >
                <Text style={styles.navText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Text style={styles.menuIcon}>{isMenuOpen ? "✕" : "☰"}</Text>
          </TouchableOpacity>
        )}

        <LanguageSwitcher
          currentLang={currentLang}
          onLanguageChange={onLanguageChange}
        />
      </View>

      {isMenuOpen && width <= 768 && (
        <View style={styles.mobileMenu}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.key}
              style={styles.mobileMenuItem}
              onPress={() => {
                onNavigate(item.key);
                setIsMenuOpen(false);
              }}
            >
              <Text style={styles.mobileMenuText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </Animated.View>
  );
};

// Animated Floating Component
const FloatingElement = ({ children, delay = 0, duration = 3000 }) => {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -10,
          duration: duration / 2,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: duration / 2,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  return (
    <Animated.View style={{ transform: [{ translateY }] }}>
      {children}
    </Animated.View>
  );
};

// Fade In Component
const FadeIn = ({ children, delay = 0, style }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 800,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 800,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[style, { opacity, transform: [{ translateY }] }]}>
      {children}
    </Animated.View>
  );
};

// Cake Card Component
const CakeCard = ({ name, description, price, image, delay }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <FadeIn delay={delay}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        <Animated.View
          style={[styles.cakeCard, { transform: [{ scale: scaleAnim }] }]}
        >
          <Image
            source={image}
            style={styles.cakeImage}
            resizeMode="cover"
          />
          <View style={styles.cakeInfo}>
            <Text style={styles.cakeName}>{name}</Text>
            <Text style={styles.cakeDescription}>{description}</Text>
            <Text style={styles.cakePrice}>{price}</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </FadeIn>
  );
};

// Order Step Component
const OrderStep = ({ number, title, description, delay }) => (
  <FadeIn delay={delay} style={styles.orderStep}>
    <View style={styles.stepNumber}>
      <Text style={styles.stepNumberText}>{number}</Text>
    </View>
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>{title}</Text>
      <Text style={styles.stepDescription}>{description}</Text>
    </View>
  </FadeIn>
);

export default function App() {
  const [language, setLanguage] = useState("en");
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const sectionRefs = useRef({
    home: null,
    cakes: null,
    order: null,
  });

  const t = translations[language];

  const heroTranslateY = scrollY.interpolate({
    inputRange: [0, 300],
    outputRange: [0, 100],
    extrapolate: "clamp",
  });

  const heroOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0.3],
    extrapolate: "clamp",
  });

  const handleNavigate = (section) => {
    if (section === "home") {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    } else if (sectionRefs.current[section]) {
      sectionRefs.current[section].measureLayout(
        scrollViewRef.current,
        (x, y) => {
          scrollViewRef.current?.scrollTo({ y: y - 80, animated: true });
        },
        () => {}
      );
    }
  };

  return (
    <View style={styles.container}>
      <Header
        onNavigate={handleNavigate}
        currentLang={language}
        onLanguageChange={setLanguage}
        scrollY={scrollY}
      />

      <Animated.ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {/* Hero Section */}
        <Animated.View
          ref={(ref) => (sectionRefs.current.home = ref)}
          style={[
            styles.heroSection,
            {
              transform: [{ translateY: heroTranslateY }],
              opacity: heroOpacity,
            },
          ]}
        >
          <FloatingElement delay={0} duration={4000}>
            <Image
              source={logoImage}
              style={styles.heroLogo}
              resizeMode="contain"
            />
          </FloatingElement>

          <FadeIn delay={700}>
            <Text style={styles.heroSubtitle}>{t.hero.subtitle}</Text>
          </FadeIn>

          <FadeIn delay={900}>
            <View style={styles.decorativeLine} />
          </FadeIn>

          <FadeIn delay={1100}>
            <Text style={styles.heroDescription}>{t.hero.description}</Text>
          </FadeIn>

          <View style={styles.decorativeElements}>
            <FloatingElement delay={200} duration={3500}>
              <View
                style={[
                  styles.decorativeCircle,
                  { backgroundColor: COLORS.yellow },
                ]}
              />
            </FloatingElement>
            <FloatingElement delay={400} duration={4500}>
              <View
                style={[
                  styles.decorativeCircle,
                  styles.circleRight,
                  { backgroundColor: COLORS.orange },
                ]}
              />
            </FloatingElement>
          </View>
        </Animated.View>

        {/* Cakes Section */}
        <View
          ref={(ref) => (sectionRefs.current.cakes = ref)}
          style={styles.cakesSection}
        >
          <FadeIn delay={200}>
            <Text style={styles.sectionTitle}>{t.cakes.title}</Text>
            <View style={styles.sectionDivider} />
          </FadeIn>

          <View style={styles.cakesGrid}>
            {t.cakes.items.map((cake, index) => (
              <CakeCard
                key={index}
                name={cake.name}
                description={cake.description}
                price={cake.price}
                image={cake.image}
                delay={300 + index * 100}
              />
            ))}
          </View>
        </View>

        {/* How to Order Section */}
        <View
          ref={(ref) => (sectionRefs.current.order = ref)}
          style={styles.orderSection}
        >
          <FadeIn delay={200}>
            <Text style={styles.sectionTitle}>{t.order.title}</Text>
            <View
              style={[styles.sectionDivider, { backgroundColor: COLORS.white }]}
            />
          </FadeIn>

          <View style={styles.orderSteps}>
            {t.order.steps.map((step, index) => (
              <OrderStep
                key={index}
                number={String(index + 1)}
                title={step.title}
                description={step.description}
                delay={300 + index * 150}
              />
            ))}
          </View>

          <FadeIn delay={900}>
            <TouchableOpacity style={styles.contactButton}>
              <Text style={styles.contactButtonText}>{t.order.button}</Text>
            </TouchableOpacity>
          </FadeIn>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Image
            source={logoImage}
            style={styles.footerLogo}
            resizeMode="contain"
          />
          <View style={styles.footerDivider} />
          <Text style={styles.footerText}>{t.footer.tagline}</Text>
          <Text style={styles.footerCopyright}>{t.footer.copyright}</Text>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },
  scrollView: {
    flex: 1,
  },
  // Header Styles
  header: {
    position: Platform.OS === "web" ? "fixed" : "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    paddingTop: Platform.OS === "web" ? 0 : 50,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  headerLogo: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.teal,
    letterSpacing: 1,
  },
  headerNav: {
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
  },
  navItem: {
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  navText: {
    fontSize: 16,
    color: COLORS.teal,
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  menuButton: {
    padding: 10,
  },
  menuIcon: {
    fontSize: 24,
    color: COLORS.teal,
  },
  mobileMenu: {
    backgroundColor: COLORS.cream,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderTopWidth: 1,
    borderTopColor: COLORS.teal + "20",
  },
  mobileMenuItem: {
    paddingVertical: 15,
  },
  mobileMenuText: {
    fontSize: 16,
    color: COLORS.teal,
    fontWeight: "500",
  },
  // Language Switcher Styles
  languageSwitcher: {
    position: "relative",
    zIndex: 2000,
  },
  languageButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.teal,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    gap: 6,
    ...Platform.select({
      web: {
        boxShadow: "0 2px 10px rgba(42, 107, 107, 0.2)",
      },
      default: {
        shadowColor: COLORS.teal,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
      },
    }),
  },
  languageFlag: {
    fontSize: 18,
  },
  languageLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  languageArrow: {
    fontSize: 10,
    color: COLORS.white,
  },
  languageDropdown: {
    position: "absolute",
    top: 50,
    right: 0,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    overflow: "hidden",
    minWidth: 120,
    ...Platform.select({
      web: {
        boxShadow: "0 4px 20px rgba(42, 107, 107, 0.25)",
      },
      default: {
        shadowColor: COLORS.teal,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 8,
      },
    }),
  },
  languageOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.teal + "10",
  },
  languageOptionActive: {
    backgroundColor: COLORS.teal + "10",
  },
  languageOptionLabel: {
    fontSize: 14,
    color: COLORS.teal,
    fontWeight: "500",
  },
  languageOptionLabelActive: {
    fontWeight: "700",
    color: COLORS.teal,
  },
  heroLogo: {
    width: 300,
    height: 300,
  },
  footerLogo: {
    width: 150,
    height: 150,
  },
  heroSection: {
    minHeight: 700,
    paddingTop: Platform.OS === "web" ? 80 : 100,
    paddingBottom: 60,
    paddingHorizontal: 30,
    alignItems: "center",
    backgroundColor: COLORS.cream,
    position: "relative",
    overflow: "hidden",
  },
  heroSubtitle: {
    fontSize: 22,
    color: COLORS.teal,
    marginTop: 40,
    textAlign: "center",
    fontWeight: "300",
    letterSpacing: 1,
  },
  decorativeLine: {
    width: 80,
    height: 3,
    backgroundColor: COLORS.orange,
    marginTop: 25,
    borderRadius: 2,
  },
  heroDescription: {
    fontSize: 16,
    color: COLORS.teal,
    textAlign: "center",
    marginTop: 25,
    lineHeight: 26,
    maxWidth: 500,
    opacity: 0.8,
  },
  decorativeElements: {
    position: "absolute",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
  },
  decorativeCircle: {
    position: "absolute",
    width: 15,
    height: 15,
    borderRadius: 10,
    opacity: 0.3,
    top: 150,
    left: 30,
  },
  circleRight: {
    left: "auto",
    right: 30,
    top: 200,
    width: 20,
    height: 20,
  },
  cakesSection: {
    backgroundColor: COLORS.white,
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 36,
    fontWeight: "300",
    color: COLORS.teal,
    textAlign: "center",
    letterSpacing: 2,
  },
  sectionDivider: {
    width: 60,
    height: 3,
    backgroundColor: COLORS.orange,
    alignSelf: "center",
    marginTop: 15,
    marginBottom: 40,
    borderRadius: 2,
  },
  cakesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    maxWidth: 1200,
    alignSelf: "center",
  },
  cakeCard: {
    width: width > 768 ? 340 : width - 40,
    backgroundColor: COLORS.cream,
    borderRadius: 20,
    margin: 15,
    overflow: "hidden",
    ...Platform.select({
      web: {
        boxShadow: "0 8px 30px rgba(42, 107, 107, 0.12)",
      },
      default: {
        shadowColor: COLORS.teal,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 15,
        elevation: 8,
      },
    }),
  },
  cakeImage: {
    width: "100%",
    height: 240,
  },
  cakeInfo: {
    padding: 25,
  },
  cakeName: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.teal,
    marginBottom: 8,
  },
  cakeDescription: {
    fontSize: 14,
    color: COLORS.teal,
    opacity: 0.7,
    lineHeight: 22,
    marginBottom: 15,
  },
  cakePrice: {
    fontSize: 24,
    fontWeight: "600",
    color: COLORS.orange,
  },
  orderSection: {
    backgroundColor: COLORS.teal,
    paddingVertical: 70,
    paddingHorizontal: 30,
  },
  orderSteps: {
    maxWidth: 600,
    alignSelf: "center",
    width: "100%",
  },
  orderStep: {
    flexDirection: "row",
    marginBottom: 35,
    alignItems: "flex-start",
  },
  stepNumber: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.orange,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  stepNumberText: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.white,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.white,
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 15,
    color: COLORS.white,
    opacity: 0.85,
    lineHeight: 24,
  },
  contactButton: {
    backgroundColor: COLORS.yellow,
    paddingVertical: 18,
    paddingHorizontal: 50,
    borderRadius: 30,
    alignSelf: "center",
    marginTop: 30,
    ...Platform.select({
      web: {
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
      },
      default: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
      },
    }),
  },
  contactButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.teal,
    letterSpacing: 1,
  },
  footer: {
    backgroundColor: COLORS.cream,
    paddingVertical: 50,
    paddingHorizontal: 30,
    alignItems: "center",
  },
  footerDivider: {
    width: 40,
    height: 2,
    backgroundColor: COLORS.orange,
    marginVertical: 20,
  },
  footerText: {
    fontSize: 14,
    color: COLORS.teal,
    opacity: 0.7,
    fontStyle: "italic",
  },
  footerCopyright: {
    fontSize: 12,
    color: COLORS.teal,
    opacity: 0.5,
    marginTop: 15,
  },
});
