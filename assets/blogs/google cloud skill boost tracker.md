Building a Google Cloud Skills Boost Tracker Backend
====================================================

[![Sayan Sarkar](https://miro.medium.com/v2/resize:fill:64:64/1*ckonRVccCJQthJrZ8fZFvw@2x.jpeg)](https://medium.com/?source=post_page---byline--f14e2521c678---------------------------------------)

[Sayan Sarkar](https://medium.com/?source=post_page---byline--f14e2521c678---------------------------------------)

5 min read

·

Oct 15, 2024

[nameless link](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fvote%2Fp%2Ff14e2521c678&operation=register&redirect=https%3A%2F%2Fpsypherion.medium.com%2Fbuilding-a-google-cloud-skills-boost-tracker-backend-f14e2521c678&user=Sayan+Sarkar&userId=33445fab81c5&source=---header_actions--f14e2521c678---------------------clap_footer------------------)

--

[nameless link](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fbookmark%2Fp%2Ff14e2521c678&operation=register&redirect=https%3A%2F%2Fpsypherion.medium.com%2Fbuilding-a-google-cloud-skills-boost-tracker-backend-f14e2521c678&source=---header_actions--f14e2521c678---------------------bookmark_footer------------------)

Listen

Share

Well… here we are again. It’s been a while since I wrote something(most consistent fr). So, basically I’m in Google Developer’s Group On Campus club for Web Development, and naturally, I gravitated towards the backend. So, I was tasked to create a A google cloud skill boost public profile tracker for on going Gen AI Study JAM 2024. And Hence this project. (Haven’t started working on Quantum Computing shit even though 24th OCT is the deadline….) For fs don’t get side tracked.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*cRSs6Icwnk2qQ9yLzEi8jg.png)

So, In today’s post, I’ll walk you through the journey of building the [**gcsbtracker-backend**](https://github.com/psypherion/gcsbtracker-backend/) — a backend service that scrapes **Google Cloud Skills Boost** profiles to track skill badges and arcade game completions and other stuffs. In this blog, I’ll cover everything from the design thought process to the implementation details, with a particular focus on how the scraping, scheduling, and serving work together to create a smooth, automated system.

The Tech Stack (Or, “What I Had Lying Around”)
----------------------------------------------

For this project, I needed something simple but effective. Here’s what I used:

*   **Python**: Because, obviously.
*   **Starlette**: A lightweight web framework for asynchronous web servers. Think Flask, but modern.
*   **Subprocess**: To run my scraping script at intervals. Scheduling magic with just enough frustration to keep things interesting.
*   **Good Ol’ JSON**: None of that Firebase, MongoDB, or real-time database stuff. We’re keeping it real with JSON files, folks.

Key Features of the Backend
---------------------------

1.  **Scraping Profiles**
    The core feature — scraping **Google Cloud Skills Boost** profiles. We extract all the data points that matter: username, league, member since, badges earned, arcade games completed, and points accumulated. This is done using **regex** and HTML parsing because we like a challenge (or we’re just too stubborn to give up). Here’s the fun part: no API. So, we extract data straight from the HTML of public profiles using Python’s `requests` and **regex gymnastics**.
2.  **Automated Updates (No, I Won’t Do This Manually Every Day)**
    Nobody wants to run a scraping script every few hours manually. So, I wrote a **scheduler** that runs the scraping script (aptly named `getData.py`) at a set interval—every 30 minutes, to be precise. Here’s how it works:

*   The server runs continuously, thanks to **Starlette**.
*   Every 30 minutes, a background task fires up the scraping script to get fresh data.

So, whether people are earning new badges or moving up leagues, the tracker stays up-to-date without me lifting a finger.

```
async def run_get_data_script():
    while True:
        logger.info("Running getData.py to update profiles...")
        subprocess.run(["python", "getData.py"], check=True)
        await asyncio.sleep(1800)  # Wait for 30 minutes
```

3. **Serving Data via API**
Once we scrape the data, we serve it via a simple **API**. I’m talking JSON responses from an endpoint like `/profiles` or `/profiles/id/{id}`. The server loads the scraped data from a JSON file and sends it off to anyone who requests it (because transparency is key, or something like that).

```
async def profiles(request) -> JSONResponse:
    """
    Displays all the data from the JSON file.
    Args:
        request: The incoming HTTP request.
    Returns:
        JSONResponse: A JSON response containing all profiles.
    """
    data = load_data('profiles_data.json')  
    logger.info("Retrieved all profiles.")
    return JSONResponse(data)
async def get_profile(request) -> JSONResponse:
    """
    API Endpoint to retrieve profiles by profile_id.
    Args:
        request: The incoming HTTP request.
    Returns:
        JSONResponse: A JSON response with the requested profile or an error message.
    """
    profile_id: str = request.path_params['id']
    data: Dict[str, Any] = load_data('profiles_data.json')  
    # Find the profile by ID
    profile: Dict[str, Any] = {}
    for name, info in data.items():
        if info['general']['profile_id'] == profile_id:
            profile = {name: info}
            break
    if profile:
        logger.info(f"Profile found for ID: {profile_id}")
        return JSONResponse(profile)
    else:
        logger.warning(f"Profile not found for ID: {profile_id}")
        return JSONResponse({"error": "Profile not found"}, status_code=404)

``````
routes: list[Route] = [    Route('/profiles', profiles),
    Route('/profiles/id/{id}', get_profile),  # Route to fetch by ID
]
```

*   Want to see all profiles? Hit `/profiles`.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*t3TJkGvfPDEzSFTo2HKo6Q.png)

*   Need to filter by profile ID? `/profiles/id/{id}` has your back.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*4klVGKtW7o0ETom4DmB7Nw.png)

No fancy frontend here; we’re just dumping data straight into JSON because who needs pretty UIs when you’ve got well-structured API responses?

1.  **Why Starlette?**
    I needed something fast and asynchronous, and **Starlette** felt like a good middle ground between Flask’s simplicity and FastAPI’s feature set. It also let me run background tasks easily (which, as you can imagine, was crucial for automating data scraping).
2.  **Why No Database?**
    Because JSON is quick and dirty. For now, the scraped data is dumped into a JSON file. I could’ve gone for a database like Firebase, but keeping things lightweight felt more satisfying.

Challenges
----------

*   **Regex Hell**: Parsing HTML with regex is about as fun as it sounds. There’s a lot of trial and error, but the satisfaction of seeing those badges and points pop up correctly is worth it.

Some regex shit for fun :

```
"""Extracts badge names, their corresponding completion dates, and images."""
badge_pattern: str = (
    r"<div class='profile-badge'>\s*"
    r"<a class=\"badge-image\" href=\"[^\"]*\">"
    r"<img alt=\"Badge for ([^\"]*)\" src=\"([^\"]*)\"\s*[^>]*>\s*</a>"
    r"<span class='ql-title-medium\s+l-mts'>\s*(.*?)\s*</span>"
)
date_pattern: str = r"<span class='ql-body-medium\s+l-mbs'>\s*(Earned [^\<]*)\s*</span>"
"""Extracts the profile image URL from the HTML content."""
profile_img_pattern: str = r"<ql-avatar class='profile-avatar l-mbl' size='\d+' src='([^']+)'></ql-avatar>"
```

*   **Scheduling Scripts**: Figuring out how to get `getData.py` to run every 30 minutes without halting the server was interesting, to say the least. I had to embrace Python’s `asyncio` and **subprocess** module, and now it works smoothly.

Future Plans
------------

*   **Move from JSON to a Real Database**: Once this outgrows a simple JSON file, I’ll hook it up to a real database, maybe **PostgreSQL** or **MongoDB**.
*   **Expand Features**: I could add a **leaderboard** and more detailed analytics, like tracking progress over time. Maybe even a dashboard, if I’m feeling ambitious.

Final Thoughts
--------------

The **gcsbtracker-backend** project has been both frustrating and rewarding. Scraping is never easy, but sometimes you have to work with what you’ve got. Building this backend made me appreciate clean APIs even more. Until then, I’ll keep scraping and serving JSON like it’s 1999.

If you want to check out the code or contribute (because let’s face it, there’s always something to improve), you can find the repo on [GitHub](https://github.com/psypherion/gcsbtracker-backend).

Happy scraping!