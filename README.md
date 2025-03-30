# Dewy

A modern and responsive weather dashboard web application built with React.js.

## Tech Stack Used

- **Framework:** React.js
- **Bundler:** Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Hooks Library:** React Use, `@uidotdev/usehooks`

## Demo Video

![Demo](https://c3zcjux6qs.ufs.sh/f/oKESAOMdpV6HqFltlsUt2Z5pI6Fi7hVOvobXwQLlfyc9KmCP)

## ScreenShots
![1](https://c3zcjux6qs.ufs.sh/f/oKESAOMdpV6HcHeAELqEAIU61ePuJoiQqljhwYLz0WNfH57D)
![2](https://c3zcjux6qs.ufs.sh/f/oKESAOMdpV6Hek2b0ICC5bEnPaqRgTWm8xXFo34QZVl2tGuw)
![3](https://c3zcjux6qs.ufs.sh/f/oKESAOMdpV6H0iuHnVeufwLvX8xT27Szc5jBgKERrHA1bJpe)
![4](https://c3zcjux6qs.ufs.sh/f/oKESAOMdpV6Hyz5QzWcZwz7jhAXicOdMPHtEnxL1mNo68eYU)


## Setup Instructions

Follow these steps to run the project locally:

1.  **Clone the repository:**

    ```bash
    git clone [your repository URL]
    cd Dewy
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Create `.env` file:**
    Create a `.env` file in the root of your project and add your OpenWeatherMap API key:

    ```
    VITE_API_KEY=YOUR_OPENWEATHERMAP_API_KEY
    ```

    **Important:** Replace `YOUR_OPENWEATHERMAP_API_KEY` with your actual API key obtained from [https://openweathermap.org/api](https://openweathermap.org/api).

4.  **Start the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    This will start the application on a local development server (usually `http://localhost:5173`).

## API Integration Details

This application integrates with the [OpenWeatherMap API](https://openweathermap.org/api) to fetch live weather information.

- **API Used:**

  - **Current Weather API:** To fetch the current weather conditions for a searched city.
    - Endpoint: `https://api.openweathermap.org/data/2.5/weather`
  - **3-hour forecast for 5 days API:** To retrieve the weather forecast for the next 5 days with 3-hour intervals.
    - Endpoint: `https://api.openweathermap.org/data/2.5/forecast`
  - **Reverse Geocoding API:** To get city, state, and country information based on latitude and longitude.
    - Endpoint: `http://api.openweathermap.org/geo/1.0/reverse`

- **API Key:** You need to register for a free API key on the OpenWeatherMap website ([https://openweathermap.org/api](https://openweathermap.org/api)). This key should be stored in a `.env` file as `VITE_API_KEY`. The application will then access this key through environment variables.

- **Rate Limits (Free Tier):** This application utilizes the free tier of the OpenWeatherMap API, which has the following limitations:

  - **60 API calls per minute**
  - **1,000,000 API calls per month**
    Please be mindful of these limits while using the application, especially during development and testing. Excessive requests might lead to temporary blocking of your API key.

- **Units:** The application fetches weather data in Celsius (`units=metric` parameter is used in the API calls).

- **HTTP Client:** The application uses the `axios` library to make HTTP requests to the OpenWeatherMap API.

This `README.md` now includes the specific rate limits for the free tier of the OpenWeatherMap API. Remember to commit this file to your repository.
