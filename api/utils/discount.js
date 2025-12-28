
export const calculateDiscountedPrice = (originalPrice, discount) => {
  if (!discount) {
    return originalPrice;
  }
    const currentDate = new Date();
    if (currentDate < discount.startDate || currentDate > discount.endDate) {
      return originalPrice;
    }
    let discountedPrice = originalPrice;
    switch (discount.type) {
      case "percentage":    
        if (discount.percentage) {
          discountedPrice = originalPrice - (originalPrice * discount.percentage) / 100;
        }
        break;
      case "fixed":
        if (discount.discountAmount) {
            discountedPrice = originalPrice - discount.discountAmount;
        }
        break;
        case "buy_x_get_y":
        if (discount.buyXgetY.buyQty && discount.buyXgetY.getQty) {
            const percentage = (discount.buyXgetY.getQty / (discount.buyXgetY.buyQty + discount.buyXgetY.getQty)) * 100;
            discountedPrice = originalPrice - (originalPrice * percentage) / 100;
        }
        break;
        default:
        break;
    }
    return discountedPrice < 0 ? 0 : discountedPrice;
};

