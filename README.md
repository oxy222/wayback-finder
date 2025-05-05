# Wayback Finder 

A simple, sleek, and mobile-friendly web application to find the most recent snapshot of a given URL stored in the Internet Archive's Wayback Machine.

## Features

* Fetches the latest available snapshot for a URL.
* Uses the official Wayback Machine Availability API.
* Clean, responsive user interface.
* Loading state indication.
* Clear error handling and messages.
* Built with vanilla HTML, CSS, and JavaScript.
* Ready for deployment on static hosting platforms like Vercel or Netlify.

## How to Use

1.  Visit the deployed website (once you deploy it).
2.  Enter the full URL (including `http://` or `https://`) of the webpage you want to check.
3.  Click the "Find Snapshot" button.
4.  If a snapshot exists, a link to the latest version on the Wayback Machine will be displayed along with the capture timestamp.
5.  If no snapshot is found or an error occurs, an appropriate message will be shown.

## Deployment

This project is designed for static deployment.

**Deploying with Vercel:**

1.  Push this project code to a GitHub (or GitLab/Bitbucket) repository.
2.  Go to [Vercel](https://vercel.com/) and sign up or log in.
3.  Click "Add New..." -> "Project".
4.  Import the Git repository containing this project.
5.  Vercel should automatically detect it as a static site (no framework preset needed).
6.  Click "Deploy". Vercel will provide you with a live URL for your project.

## Development

To run locally:

1.  Clone the repository:
    ```bash
    git clone <your-repo-url>
    cd wayback-finder
    ```
2.  Simply open the `index.html` file in your web browser. No build step is required.

## API Used

This tool utilizes the [Internet Archive Wayback Machine Availability API](https://github.com/internetarchive/wayback/tree/master/wayback-cdx-server#availability-api).
