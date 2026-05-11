import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const COLORS = {
  primary: "#E86A33",
  secondary: "#F5C542",
  cream: "#FFF9F0",
  teal: "#2A6B6B",
  white: "#FFFFFF",
  text: "#1A1410",
  textLight: "#7c6f5e",
  border: "#e6d8bc",
};

// Wizard data
const WIZARD_STEPS = [
  { id: 1, title: "Base", description: "Choose your cake base" },
  { id: 2, title: "Cream", description: "Select your cream filling" },
  { id: 3, title: "Toppings", description: "Add delicious toppings" },
  { id: 4, title: "Cover", description: "Choose your cake cover" },
  { id: 5, title: "Size", description: "Select cake size" },
  { id: 6, title: "Message", description: "Add a personal message" },
  { id: 7, title: "Review", description: "Review and confirm order" },
];

const BASE_OPTIONS = [
  { id: "vanilla", name: "Vanilla", price: 15, emoji: "🍰" },
  { id: "chocolate", name: "Chocolate", price: 17, emoji: "🍫" },
  { id: "honey", name: "Honey", price: 18, emoji: "🍯" },
  { id: "red-velvet", name: "Red Velvet", price: 20, emoji: "❤️" },
  { id: "carrot", name: "Carrot", price: 18, emoji: "🥕" },
];

const CREAM_OPTIONS = [
  { id: "none", name: "None", price: 0, emoji: "🚫" },
  { id: "vanilla", name: "Vanilla", price: 5, emoji: "🍦" },
  { id: "chocolate", name: "Chocolate", price: 6, emoji: "🍫" },
  { id: "fruit", name: "Fruit", price: 7, emoji: "🍓" },
  { id: "caramel", name: "Caramel", price: 6, emoji: "🍮" },
  { id: "nutella", name: "Nutella", price: 8, emoji: "🌰" },
];

const TOPPING_OPTIONS = [
  { id: "none", name: "None", price: 0, emoji: "🚫" },
  { id: "fruits", name: "Fresh Fruits", price: 8, emoji: "🍓" },
  { id: "nuts", name: "Nuts", price: 6, emoji: "🥜" },
  { id: "choco-chips", name: "Chocolate Chips", price: 5, emoji: "🍫" },
  { id: "cookies", name: "Cookie Crumbs", price: 5, emoji: "🍪" },
  { id: "caramel", name: "Caramel", price: 6, emoji: "🍮" },
];

const COVER_OPTIONS = [
  { id: "naked", name: "Naked", price: 0, emoji: "🎂" },
  { id: "buttercream", name: "Buttercream", price: 10, emoji: "🧈" },
  { id: "fondant", name: "Fondant", price: 15, emoji: "🎨" },
  { id: "ganache", name: "Ganache", price: 12, emoji: "🍫" },
  { id: "cream-cheese", name: "Cream Cheese", price: 10, emoji: "🧀" },
  { id: "fruit-deco", name: "Fruit Decoration", price: 12, emoji: "🍓" },
];

const SIZE_OPTIONS = [
  { id: "small", name: 'Small 6"', multiplier: 1, emoji: "🎂" },
  { id: "medium", name: 'Medium 8"', multiplier: 1.5, emoji: "🎂" },
  { id: "large", name: 'Large 10"', multiplier: 2, emoji: "🎂" },
];

const CakeBuilder = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selections, setSelections] = useState({
    base: null,
    cream: null,
    toppings: [],
    cover: null,
    size: null,
    message: "",
    deliveryDate: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
  });

  // Calculate total price
  const calculateTotal = () => {
    let basePrice = 0;

    if (selections.base) {
      const base = BASE_OPTIONS.find((b) => b.id === selections.base);
      basePrice += base?.price || 0;
    }

    if (selections.cream) {
      const cream = CREAM_OPTIONS.find((c) => c.id === selections.cream);
      basePrice += cream?.price || 0;
    }

    selections.toppings.forEach((toppingId) => {
      const topping = TOPPING_OPTIONS.find((t) => t.id === toppingId);
      basePrice += topping?.price || 0;
    });

    if (selections.cover) {
      const cover = COVER_OPTIONS.find((c) => c.id === selections.cover);
      basePrice += cover?.price || 0;
    }

    if (selections.size) {
      const size = SIZE_OPTIONS.find((s) => s.id === selections.size);
      basePrice *= size?.multiplier || 1;
    }

    return basePrice;
  };

  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSelectBase = (id) => {
    setSelections({ ...selections, base: id });
  };

  const handleSelectCream = (id) => {
    setSelections({ ...selections, cream: id });
  };

  const handleToggleTopping = (id) => {
    if (id === "none") {
      setSelections({ ...selections, toppings: [] });
    } else {
      const newToppings = selections.toppings.includes(id)
        ? selections.toppings.filter((t) => t !== id)
        : [...selections.toppings.filter((t) => t !== "none"), id];
      setSelections({ ...selections, toppings: newToppings });
    }
  };

  const handleSelectCover = (id) => {
    setSelections({ ...selections, cover: id });
  };

  const handleSelectSize = (id) => {
    setSelections({ ...selections, size: id });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selections.base !== null;
      case 2:
        return selections.cream !== null;
      case 3:
        return true; // Toppings are optional
      case 4:
        return selections.cover !== null;
      case 5:
        return selections.size !== null;
      case 6:
        return true; // Message is optional
      case 7:
        return selections.contactName && selections.contactEmail;
      default:
        return false;
    }
  };

  const ProgressBar = () => (
    <View style={styles.progressContainer}>
      {WIZARD_STEPS.map((step, index) => (
        <View key={step.id} style={styles.progressStep}>
          <View
            style={[
              styles.progressDot,
              currentStep >= step.id && styles.progressDotActive,
              currentStep === step.id && styles.progressDotCurrent,
            ]}
          >
            <Text
              style={[
                styles.progressDotText,
                currentStep >= step.id && styles.progressDotTextActive,
              ]}
            >
              {step.id}
            </Text>
          </View>
          {index < WIZARD_STEPS.length - 1 && (
            <View
              style={[
                styles.progressLine,
                currentStep > step.id && styles.progressLineActive,
              ]}
            />
          )}
        </View>
      ))}
    </View>
  );

  const OptionCard = ({ option, selected, onPress, showPrice = true }) => (
    <TouchableOpacity
      style={[styles.optionCard, selected && styles.optionCardSelected]}
      onPress={() => onPress(option.id)}
    >
      <Text style={styles.optionEmoji}>{option.emoji}</Text>
      <Text style={styles.optionName}>{option.name}</Text>
      {showPrice && option.price > 0 && (
        <Text style={styles.optionPrice}>
          +${option.price}
        </Text>
      )}
      {showPrice && option.price === 0 && (
        <Text style={styles.optionPriceFree}>Free</Text>
      )}
      {option.multiplier && (
        <Text style={styles.optionMultiplier}>x{option.multiplier}</Text>
      )}
    </TouchableOpacity>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Base
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Choose Your Cake Base</Text>
            <Text style={styles.stepDescription}>
              Select the foundation of your perfect cake
            </Text>
            <View style={styles.optionsGrid}>
              {BASE_OPTIONS.map((option) => (
                <OptionCard
                  key={option.id}
                  option={option}
                  selected={selections.base === option.id}
                  onPress={handleSelectBase}
                />
              ))}
            </View>
          </View>
        );

      case 2: // Cream
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Select Your Cream Filling</Text>
            <Text style={styles.stepDescription}>
              Add a delicious cream layer
            </Text>
            <View style={styles.optionsGrid}>
              {CREAM_OPTIONS.map((option) => (
                <OptionCard
                  key={option.id}
                  option={option}
                  selected={selections.cream === option.id}
                  onPress={handleSelectCream}
                />
              ))}
            </View>
          </View>
        );

      case 3: // Toppings
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Add Delicious Toppings</Text>
            <Text style={styles.stepDescription}>
              Select multiple toppings (optional)
            </Text>
            <View style={styles.optionsGrid}>
              {TOPPING_OPTIONS.map((option) => (
                <OptionCard
                  key={option.id}
                  option={option}
                  selected={selections.toppings.includes(option.id)}
                  onPress={handleToggleTopping}
                />
              ))}
            </View>
          </View>
        );

      case 4: // Cover
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Choose Your Cake Cover</Text>
            <Text style={styles.stepDescription}>
              Pick the perfect finishing touch
            </Text>
            <View style={styles.optionsGrid}>
              {COVER_OPTIONS.map((option) => (
                <OptionCard
                  key={option.id}
                  option={option}
                  selected={selections.cover === option.id}
                  onPress={handleSelectCover}
                />
              ))}
            </View>
          </View>
        );

      case 5: // Size
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Select Cake Size</Text>
            <Text style={styles.stepDescription}>
              Size multiplies the total price
            </Text>
            <View style={styles.optionsGrid}>
              {SIZE_OPTIONS.map((option) => (
                <OptionCard
                  key={option.id}
                  option={option}
                  selected={selections.size === option.id}
                  onPress={handleSelectSize}
                  showPrice={false}
                />
              ))}
            </View>
          </View>
        );

      case 6: // Message
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Add a Personal Message</Text>
            <Text style={styles.stepDescription}>
              Optional: Write a message for the cake (max 50 characters)
            </Text>
            <TextInput
              style={styles.messageInput}
              placeholder="e.g., Happy Birthday Sarah!"
              value={selections.message}
              onChangeText={(text) =>
                setSelections({ ...selections, message: text.slice(0, 50) })
              }
              maxLength={50}
              multiline
            />
            <Text style={styles.charCount}>
              {selections.message.length}/50 characters
            </Text>
          </View>
        );

      case 7: // Review
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Review Your Order</Text>
            <View style={styles.reviewSection}>
              <Text style={styles.reviewLabel}>Base:</Text>
              <Text style={styles.reviewValue}>
                {BASE_OPTIONS.find((b) => b.id === selections.base)?.name} - $
                {BASE_OPTIONS.find((b) => b.id === selections.base)?.price}
              </Text>
            </View>
            <View style={styles.reviewSection}>
              <Text style={styles.reviewLabel}>Cream:</Text>
              <Text style={styles.reviewValue}>
                {CREAM_OPTIONS.find((c) => c.id === selections.cream)?.name} -
                ${CREAM_OPTIONS.find((c) => c.id === selections.cream)?.price}
              </Text>
            </View>
            <View style={styles.reviewSection}>
              <Text style={styles.reviewLabel}>Toppings:</Text>
              <Text style={styles.reviewValue}>
                {selections.toppings.length > 0
                  ? selections.toppings
                      .map(
                        (t) =>
                          `${TOPPING_OPTIONS.find((opt) => opt.id === t)?.name} ($${TOPPING_OPTIONS.find((opt) => opt.id === t)?.price})`
                      )
                      .join(", ")
                  : "None"}
              </Text>
            </View>
            <View style={styles.reviewSection}>
              <Text style={styles.reviewLabel}>Cover:</Text>
              <Text style={styles.reviewValue}>
                {COVER_OPTIONS.find((c) => c.id === selections.cover)?.name} - $
                {COVER_OPTIONS.find((c) => c.id === selections.cover)?.price}
              </Text>
            </View>
            <View style={styles.reviewSection}>
              <Text style={styles.reviewLabel}>Size:</Text>
              <Text style={styles.reviewValue}>
                {SIZE_OPTIONS.find((s) => s.id === selections.size)?.name} (x
                {SIZE_OPTIONS.find((s) => s.id === selections.size)?.multiplier}
                )
              </Text>
            </View>
            {selections.message && (
              <View style={styles.reviewSection}>
                <Text style={styles.reviewLabel}>Message:</Text>
                <Text style={styles.reviewValue}>"{selections.message}"</Text>
              </View>
            )}

            <View style={styles.divider} />

            <Text style={styles.contactFormTitle}>Contact Information</Text>
            <TextInput
              style={styles.input}
              placeholder="Full Name *"
              value={selections.contactName}
              onChangeText={(text) =>
                setSelections({ ...selections, contactName: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Email *"
              value={selections.contactEmail}
              onChangeText={(text) =>
                setSelections({ ...selections, contactEmail: text })
              }
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={selections.contactPhone}
              onChangeText={(text) =>
                setSelections({ ...selections, contactPhone: text })
              }
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Delivery Date (YYYY-MM-DD)"
              value={selections.deliveryDate}
              onChangeText={(text) =>
                setSelections({ ...selections, deliveryDate: text })
              }
            />

            <TouchableOpacity style={styles.orderButton}>
              <Text style={styles.orderButtonText}>Place Order - ${calculateTotal().toFixed(2)}</Text>
            </TouchableOpacity>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🎂 Cake Builder</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>

      <ProgressBar />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderStepContent()}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.priceDisplay}>
          <Text style={styles.priceLabel}>Total:</Text>
          <Text style={styles.priceValue}>${calculateTotal().toFixed(2)}</Text>
        </View>
        <View style={styles.navigation}>
          {currentStep > 1 && (
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
          )}
          {currentStep < 7 && (
            <TouchableOpacity
              style={[styles.nextButton, !canProceed() && styles.nextButtonDisabled]}
              onPress={handleNext}
              disabled={!canProceed()}
            >
              <Text style={styles.nextButtonText}>Next →</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: COLORS.teal,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.cream,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 24,
    color: COLORS.text,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: COLORS.white,
  },
  progressStep: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  progressDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.cream,
    borderWidth: 2,
    borderColor: COLORS.border,
    justifyContent: "center",
    alignItems: "center",
  },
  progressDotActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  progressDotCurrent: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  progressDotText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textLight,
  },
  progressDotTextActive: {
    color: COLORS.white,
  },
  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: COLORS.border,
    marginHorizontal: 4,
  },
  progressLineActive: {
    backgroundColor: COLORS.primary,
  },
  content: {
    flex: 1,
  },
  stepContent: {
    padding: 24,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: "600",
    color: COLORS.teal,
    marginBottom: 8,
    textAlign: "center",
  },
  stepDescription: {
    fontSize: 16,
    color: COLORS.textLight,
    marginBottom: 32,
    textAlign: "center",
  },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
  },
  optionCard: {
    width: width > 768 ? 160 : (width - 64) / 2,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.border,
    ...Platform.select({
      web: {
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      },
      default: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
      },
    }),
  },
  optionCardSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + "10",
  },
  optionEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  optionName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 4,
    textAlign: "center",
  },
  optionPrice: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primary,
  },
  optionPriceFree: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textLight,
  },
  optionMultiplier: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.teal,
    marginTop: 4,
  },
  messageInput: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 2,
    borderColor: COLORS.border,
    minHeight: 120,
    textAlignVertical: "top",
  },
  charCount: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 8,
    textAlign: "right",
  },
  reviewSection: {
    marginBottom: 16,
  },
  reviewLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textLight,
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  reviewValue: {
    fontSize: 16,
    color: COLORS.text,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 24,
  },
  contactFormTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.teal,
    marginBottom: 16,
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 2,
    borderColor: COLORS.border,
    marginBottom: 12,
  },
  orderButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 18,
    alignItems: "center",
    marginTop: 24,
    ...Platform.select({
      web: {
        boxShadow: "0 4px 12px rgba(232, 106, 51, 0.3)",
      },
      default: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
      },
    }),
  },
  orderButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.white,
    letterSpacing: 1,
  },
  footer: {
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    padding: 20,
  },
  priceDisplay: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: COLORS.cream,
    borderRadius: 12,
  },
  priceLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.teal,
  },
  priceValue: {
    fontSize: 32,
    fontWeight: "700",
    color: COLORS.primary,
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  backButton: {
    flex: 1,
    backgroundColor: COLORS.cream,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },
  nextButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  nextButtonDisabled: {
    backgroundColor: COLORS.textLight,
    opacity: 0.5,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.white,
  },
});

export default CakeBuilder;
