# Crema Flora - Telegram Mini App

A Telegram Mini App (Web App) for the Crema Flora cake shop, allowing customers to browse and order cakes directly within Telegram.

## Features

- **Product Catalog**: Browse cakes by categories (All, Classic, Fruit, Chocolate, Special)
- **Product Details**: View detailed information, descriptions, and prices
- **Shopping Cart**: Add items, adjust quantities, and review order
- **Checkout Flow**: Complete order form with delivery details
- **Telegram Integration**:
  - Automatic theme adaptation
  - Haptic feedback
  - Pre-filled user information
  - Order data sent to bot

## Setup Instructions

### 1. Create a Telegram Bot

1. Open Telegram and search for [@BotFather](https://t.me/BotFather)
2. Send `/newbot` and follow the prompts
3. Save your bot token (e.g., `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

### 2. Deploy the Web App

The Mini App is deployed alongside the main Crema Flora website on Vercel.

Access URL: `https://your-domain.vercel.app/telegram-app/`

### 3. Configure the Bot Menu Button

Send the following to [@BotFather](https://t.me/BotFather):

```
/setmenubutton
```

1. Select your bot
2. Choose "Configure menu button"
3. Enter the web app URL: `https://your-domain.vercel.app/telegram-app/`
4. Enter a button title: "Order Cakes"

### 4. Set Up Inline Mode (Optional)

To allow users to share cakes in chats:

```
/setinline
```

### 5. Bot Backend (Optional)

To receive and process orders, you'll need a bot backend. Here's a simple example using Node.js:

```javascript
const TelegramBot = require('node-telegram-bot-api');

const token = 'YOUR_BOT_TOKEN';
const bot = new TelegramBot(token, { polling: true });

// Handle Web App data
bot.on('web_app_data', (msg) => {
    const chatId = msg.chat.id;
    const data = JSON.parse(msg.web_app_data.data);

    if (data.type === 'order') {
        // Process the order
        console.log('New order received:', data);

        // Send confirmation to customer
        bot.sendMessage(chatId, data.message);

        // Forward to admin/shop owner
        const adminChatId = 'ADMIN_CHAT_ID';
        bot.sendMessage(adminChatId, data.message);
    }
});

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Welcome to Crema Flora! 🎂\n\nTap the menu button below to browse our delicious cakes and place an order.', {
        reply_markup: {
            keyboard: [[{
                text: '🎂 Order Cakes',
                web_app: { url: 'https://your-domain.vercel.app/telegram-app/' }
            }]],
            resize_keyboard: true
        }
    });
});
```

## Files Structure

```
telegram-app/
├── index.html      # Main HTML structure
├── styles.css      # Styles and animations
├── app.js          # Application logic
└── README.md       # This file
```

## Product Categories

- **All**: All available cakes
- **Classic**: Traditional cakes (Red Velvet, Biscuit, Honey)
- **Fruit**: Fruit-based cakes (Strawberry, Lemon, Blueberry, Apple)
- **Chocolate**: Chocolate cakes (Chocolate Dream, Triple Chocolate)
- **Special**: Premium cakes (Tender Elegance, Tiramisu, Raspberry Rose)

## Customization

### Adding New Products

Edit the `products` array in `app.js`:

```javascript
{
    id: 13,
    name: "New Cake Name",
    category: "category", // classic, fruit, chocolate, or special
    description: "Cake description here.",
    price: 45.00,
    weight: "1.2 kg",
    image: "../assets/cakes/image-name.webp"
}
```

### Styling

The app uses CSS variables for theming. Edit `styles.css`:

```css
:root {
    --color-primary: #2A6B6B;   /* Main brand color */
    --color-accent: #E86A33;    /* Accent/CTA color */
    --color-cta: #F5C542;       /* Button color */
    --color-background: #FFF9F0; /* Background */
}
```

## Telegram Web App API

The app uses the following Telegram Web App features:

- `tg.ready()` - Signals the app is ready
- `tg.expand()` - Expands to full height
- `tg.themeParams` - Theme colors from Telegram
- `tg.HapticFeedback` - Vibration feedback
- `tg.sendData()` - Send order to bot
- `tg.initDataUnsafe.user` - User information
- `tg.close()` - Close the web app

## Browser Testing

The app works in regular browsers too (without Telegram features). Open `index.html` directly or use a local server:

```bash
cd telegram-app
python -m http.server 8080
# Visit http://localhost:8080
```

## License

Part of the Crema Flora project.
