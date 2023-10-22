# Spotify Data Scraper

A program that establishes a connection to your Spotify account to fetch various data points. 

### Prerequisites

Before you begin, ensure you have the following installed:
- [Bun](https://bun.sh): A fast all-in-one JavaScript runtime. This project requires Bun version 1.0.4 or higher.

### Installation

1. **Initialize the Project**: 
   Clone the repository and navigate to the project directory. Run the following command to install the required dependencies:

   ```bash
   bun install
   ```

2. **Configure Spotify Developer Account**: 
   - Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications) and create a new application.
   - Set the callback URL to `http://localhost:8888`.
   - Note down the Client ID and Client Secret.

3. **Environment Variables**: 
   - Create a `.env` file in the project root directory.
   - Use the provided `env.example` as a template and fill in your Spotify application's Client ID and Client Secret.

### Usage

1. **Authentication**: 
   Run the following command to authenticate your Spotify account:

   ```bash
   ./script auth
   ```

   Click on the provided link and log in to your Spotify account to grant the necessary permissions. 

   **Note**: The authentication will remain active only for the duration of the session. A new refresh token will be generated every 30 minutes.

2. **Interacting with the Application**: 
   - Use the application as needed.
   - To exit, select the 'Quit' option.

## Built With

- [Bun](https://bun.sh) 
- [TypeScript](https://www.typescriptlang.org/)
- [Gum](https://github.com/charmbracelet/gum) - Used for enhancing shell scripts



## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


