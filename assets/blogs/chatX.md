chatX: A Real-Time Simple Text-Based Chat Server from Scratch
=============================================================

[![Sayan Sarkar](https://miro.medium.com/v2/resize:fill:64:64/1*ckonRVccCJQthJrZ8fZFvw@2x.jpeg)](https://medium.com/?source=post_page---byline--d107b728e88b---------------------------------------)

[Sayan Sarkar](https://medium.com/?source=post_page---byline--d107b728e88b---------------------------------------)

15 min read

·

Jun 10, 2024

[nameless link](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fvote%2Fp%2Fd107b728e88b&operation=register&redirect=https%3A%2F%2Fpsypherion.medium.com%2Fchatx-a-real-time-simple-text-based-chat-server-from-scratch-d107b728e88b&user=Sayan+Sarkar&userId=33445fab81c5&source=---header_actions--d107b728e88b---------------------clap_footer------------------)

--

[nameless link](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fbookmark%2Fp%2Fd107b728e88b&operation=register&redirect=https%3A%2F%2Fpsypherion.medium.com%2Fchatx-a-real-time-simple-text-based-chat-server-from-scratch-d107b728e88b&source=---header_actions--d107b728e88b---------------------bookmark_footer------------------)

Listen

Share

> So, there I was, knee-deep in documentations for a new project I’m working on. Then, somewhere along the line, I came across this YouTube video by Julia Evans: [**fun with sockets: let’s write a webserver!**](https://youtu.be/1HF-UAGcuvs?si=Rjj6E5R2VEb2M5tg) After going through this tutorial, I thought, why not create a chat server? (I actually never made a server from scratch; rather, I used pre-built modules. and I’ve always preferred anything local instead of cloud hosted platforms so why not…) It was a fun exploration and, at times, a bit frustrating too! xd

![server in work](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*wGdXIMfZN1Lh7GzLTdffCw.png)

### My approach :

First things first, building a chat server from scratch requires laying down the basics. So, I started by creating a bare-bones server locally that I could connect to. _This was like setting up the foundation of a house before adding the walls and roof._

Once the server was up and running, I focused on implementing the chatting feature. I wanted users to be able to send messages back and forth seamlessly, just like chatting on any messaging platform.

Next came the fun part — working out the quirks and adding extra features. I added functionalities like getting the user’s name, displaying when someone joins or leaves the chat, and even creating a log file to keep track of the chat history.

Now, here’s where things took an interesting turn. I initially tried port forwarding to make the server accessible outside of my local network, but it didn’t quite work as expected. So, I decided to explore tunneling options instead. That’s when I stumbled upon the **ngrok API key**, which opened up a whole new world of possibilities.

To handle authentication and generate the authentication key from the API key, I created an auth handling program. It was like designing a secure entrance to our chat room, making sure only authorized users could join the conversation.

For the communication protocol, I opted for **telnet**. Why? Well, it’s a throwback to my fascination with [**_TELEHACK_**](http://telehack.com) from years ago. Plus, telnet is simple yet effective for our chatting needs.

Now, to make the server accessible globally, I needed tunneling using ngrok on the port where the server was hosted. This meant automating the process of tunneling through ngrok, and for that, I turned to my trusty Bash scripting skills.

I had to create a Bash script that would be stored in the bin directory so that it could be called from anywhere and another script that makes the setup process smooth and hassle-free.

And that’s almost a comprehensive summary of my approach.

Before exploring the project, first let’s explore the repository : [click here](https://github.com/ky13-troj/chatX)

> **If you’re done exploring now let’s get into it :**

1. Let’s clone the repo :

```
git clone https://github.com/ky13-troj/chatX.git
cd chatX
```

2. I know I’ve told before that I didn’t want to use any modules other than pre installed but c’mon

```
pip install -r requirements.txt
```

3. You can see there’s a run.sh file which ofc we need to run but first we need to make it executable by giving the execution permission :

```
chmod +x run.sh
```

Now all we gotta do is :

```
bash run.sh
```

4. Now upon running you’ll probably get prompted to give the api keys so let’s get the api key from the ngrok :

![ngrok landing page](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*F0FCDKDWwMsn0uUvFyXiDw.png)

opt for sign up for free.

Once logged in, navigate to the API section and create an API Key

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*RfTGaDHZ3dtFFYYb7M0gig.png)

1.  **Copy your API key.**

![Don’t worry I’ve already deleted this API key](https://miro.medium.com/v2/resize:fit:1194/format:webp/1*DS4IZ1oirGR0Mga8vcUrNA.png)

**2. Remember Your api key token is shown only once in a dialogue box.**

**3. Do Not use your API ID.**

(Purpose of exclusively mentioning point 3 because one of my friend actually did this)

When prompted during the setup, **enter your Ngrok API key**.

**5. The setup scripts will handle the rest, including generating and storing the authentication token.**

Now You can start the chat server the just writing **chatX** from anywhere inside your terminal. and You’ll get a command that can be used to connect to the server even outside of the network.

Now with all that being said let’s explore the scripts :

### **A brief overview :**

*   `chat_server.py`: Main server script handling client connections, messaging.
*   `ngrok_setup.py`: Script to set up and manage Ngrok tunnels.
*   `credchecker.py`: Utility to check and fix JSON formatting issues in credentials files.
*   `auth.py`: Script for managing Ngrok API keys and authentication tokens.
*   `bash_server.sh`: Shell script to automate server setup, start, and shutdown processes.
*   `run.sh`: Shell script to create the `chatX` command for easy server start.
*   `requirements.txt`: List of Python dependencies.

Let’s explore each scripts :

### chat_server.py :

1.  **Imports and Constants :**

```
import socket
import threading
import os
import time
HOST = "0.0.0.0"
PORT = 8080
LOG_FILE = "log.txt"
clients = {}
log_lock = threading.Lock()
```

There’s not much to say but

*   Initializes `clients` dictionary to store connected clients and `log_lock` for thread-safe logging.

2. **Log Activity Function:**

```
def log_activity(message):
    timestamp = time.strftime('%Y-%m-%d %H:%M:%S')
    log_message = f"{timestamp} - {message}"
    with log_lock:
        with open(LOG_FILE, "a") as log_file:
            log_file.write(f"{log_message}\n")
        print(log_message)
```

*   Logs activity messages with a timestamp to a log file and prints them to the console.
*   Uses `log_lock` to ensure thread safety when writing to the log file.

3. **Handle Client Function:**

```
def handle_client(conn, addr):
    try:
        conn.sendall(b"Enter your name: ")
        name = conn.recv(1024).decode().strip()
        if not name:
            conn.sendall(b"Name cannot be empty. Disconnecting...\n")
            conn.close()
            return
        clients[conn] = name
        log_activity(f"{name} has joined the chat.")
        while True:
            try:
                message = conn.recv(1024).decode().strip()
                if not message:
                    break
                broadcast(f"{name}: {message}\n", conn, name)  # Prepend sender's name to messages
            except ConnectionResetError:
                break
    except Exception as e:
        print(f"Error handling client {addr}: {e}")
    finally:
        if conn in clients:
            broadcast(f"{clients[conn]} has left the chat.\n", conn)
            del clients[conn]
        conn.close()
```

*   Handles each client’s connection.
*   Asks the client for their name and adds them to the `clients` dictionary.
*   Logs when a new client joins and broadcasts their messages to other clients.
*   Catches exceptions and cleans up resources when a client disconnects.

**4. Broadcast Function:**

```
def broadcast(message, sender_conn, sender_name=None):
    for conn in clients:
        try:
            if conn == sender_conn:
                # Clear the line and show "me: message"
                conn.sendall(f"\033[F\033[Kme: {message[len(sender_name) + 2:]}".encode())  # \033[F moves cursor up, \033[K clears line
            else:
                conn.sendall(message.encode())
        except Exception as e:
            print(f"Error broadcasting message: {e}")
```

*   Sends a message to all connected clients except the sender.
*   Uses ANSI escape codes (`\033[F` and `\033[K`) for formatting to clear the line and display "me: message" for the sender.

5. **Main Function:**

```
def main():
    # Clear previous log content
    with open(LOG_FILE, "w") as log_file:
        log_file.write("")
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    server.bind((HOST, PORT))
    server.listen(10)
    log_activity(f"Server listening on {HOST}:{PORT}")
    try:
        while True:
            conn, addr = server.accept()
            log_activity(f"New connection from {addr}")
            threading.Thread(target=handle_client, args=(conn, addr)).start()
    except KeyboardInterrupt:
        log_activity("Server shutting down...")
    finally:
        server.close()
if __name__ == "__main__":
    main()
```

*   Clears the log file, creates a socket server, and listens for incoming connections.
*   Starts a new thread for each client connection, handled by `handle_client`.
*   Catches keyboard interrupts for graceful shutdown and closes the server socket at the end.

This script essentially sets up a basic chat server where clients can connect, send messages, and interact with each other, all while logging activity and handling connections asynchronously using threading.

### auth.py :

1.  **Imports and Constants:**

```
import requests
import json
import os
CREDENTIALS_FILE = "credentials.json"
```

*   Imports necessary modules (`requests`, `json`, `os`).
*   Defines the `CREDENTIALS_FILE` constant to specify the file path for storing the API key and auth token.

2. **Read API Key Function:**

```
def read_api_key(file_path):
    if not os.path.exists(file_path):
        api_key = input("Enter your ngrok API key: ")
        with open(file_path, "w") as f:
            json.dump({"api_key": api_key}, f, indent=4)
    else:
        with open(file_path, "r") as f:
            data = json.load(f)
            api_key = data.get("api_key")
            if not api_key:
                api_key = input("Enter your ngrok API key: ")
                data["api_key"] = api_key
                with open(file_path, "w") as f:
                    json.dump(data, f, indent=4)
    return api_key
```

*   Checks if the credentials file exists.
*   If it doesn’t exist, prompts the user to enter their ngrok API key and saves it to the file.
*   If it exists, reads the API key from the file. If the API key is missing, prompts the user to enter it and updates the file.
*   Returns the API key.

3. **Create Tunnel Auth Token Function:**

```
def create_tunnel_auth_token(api_key):
    url = "https://api.ngrok.com/credentials"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "Ngrok-Version": "2"
    }
    data = {
        "description": "development cred for user"
    }
    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 201:
        auth_token = response.json()["token"]
        return auth_token
    else:
        print(f"Failed to create tunnel auth token: {response.status_code}")
        print(response.json())
        return None
```

*   Sends a POST request to the ngrok API to create a tunnel authentication token.
*   Includes the API key in the request headers for authorization.
*   If the request is successful (status code 201), extracts and returns the auth token.
*   If the request fails, prints an error message and the response details, returning `None`.

4. **Save Auth Token Function:**

```
def save_auth_token(auth_token, file_path):
    with open(file_path, "r+") as f:
        data = json.load(f)
        data["auth_token"] = auth_token
        f.seek(0)
        json.dump(data, f, indent=4)
```

*   Opens the credentials file in read-write mode.
*   Loads the existing data, adds the auth token to the data, and writes the updated data back to the file.

5. **Main Function :**

```
def main():
    api_key = read_api_key(CREDENTIALS_FILE)
    auth_token = create_tunnel_auth_token(api_key)
    if auth_token:
        save_auth_token(auth_token, CREDENTIALS_FILE)
        print("Auth token saved to credentials.json.")
```

*   Reads the API key from the credentials file or prompts the user to enter it.
*   Creates a tunnel auth token using the API key.
*   If the auth token is successfully created, saves it to the credentials file and prints a success message.

This script is designed to manage ngrok authentication tokens. It prompts the user for an ngrok API key if it’s not already stored, creates a new tunnel authentication token using the API key, and saves the token to the credentials file. The script ensures that the credentials are stored securely and updated as needed, making it easy to manage ngrok tunnels for development purposes.

### ngrok_setup.py :

1.  **Imports and Constants:**

```
import subprocess
import requests
import time
import json
import os
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
CREDENTIALS_FILE = os.path.join(SCRIPT_DIR, "credentials.json")
```

*   Imports necessary modules (`subprocess`, `requests`, `time`, `json`, `os`).
*   Defines `SCRIPT_DIR` to get the directory of the current script and `CREDENTIALS_FILE` to locate the credentials file.

2. **Read API Key Function:**

```
def read_api_key(file_path):
    if os.path.exists(file_path):
        with open(file_path, "r") as f:
            data = json.load(f)
            return data.get("api_key")
    return None
```

*   Reads and returns the `api_key` from a JSON file if it exists; otherwise, returns `None`.

3. **Read Auth Token Function:**

```
def read_auth_token(file_path):
    if os.path.exists(file_path):
        with open(file_path, "r") as f:
            data = json.load(f)
            return data.get("auth_token")
    return None
```

*   Reads and returns the `auth_token` from a JSON file if it exists; otherwise, returns `None`.

4. **Kill Existing ngrok Tunnels Function:**

```
def kill_existing_ngrok():
    url = "http://127.0.0.1:4040/api/tunnels"
    try:
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            for tunnel in data['tunnels']:
                subprocess.run(["ngrok", "http", "stop", tunnel["name"]], stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)
    except requests.ConnectionError:
        pass
```

*   Fetches the list of active ngrok tunnels and stops each one using the `ngrok http stop` command.
*   Uses `requests` to get tunnel information and `subprocess` to stop tunnels.

5. **Start ngrok Function:**

```
def start_ngrok(auth_token):
    kill_existing_ngrok()
    subprocess.run(["ngrok", "authtoken", auth_token], stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)
    subprocess.Popen(["ngrok", "tcp", "8080"], stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)
```

*   Stops any existing ngrok tunnels, sets the ngrok auth token, and starts a new ngrok tunnel on port 8080 using the `tcp` protocol.

6. **Get ngrok URL Function:**

```
def get_ngrok_url():
    time.sleep(5)  # Wait for ngrok to initialize
    url = "http://127.0.0.1:4040/api/tunnels"
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        for tunnel in data['tunnels']:
            if tunnel['proto'] == 'tcp':
                return tunnel['public_url']
    except requests.exceptions.RequestException:
        return None
```

*   Waits for ngrok to initialize, then retrieves the public URL of the ngrok tunnel using the `tcp` protocol.

7. **Save ngrok URL Function:**

```
def save_ngrok_url():
    auth_token = read_auth_token(CREDENTIALS_FILE)
    if auth_token:
        start_ngrok(auth_token)
        ngrok_url = get_ngrok_url()
        if ngrok_url:
            print(f"Your ngrok URL is: {ngrok_url}")
            updated_url = ngrok_url.split("tcp://")[1]
            host, port = updated_url.split(':')
            with open(os.path.join(SCRIPT_DIR, "ngrok_url.txt"), "w") as f:
                f.write(f"{host}\n{port}\n")
        else:
            print("Failed to get ngrok URL")
    else:
        print("Auth token not found in credentials.json")
```

*   Reads the auth token, starts ngrok, retrieves the public URL, and saves it to a text file if successful.

8. **Delete Auth Tokens Function:**

```
def delete_auth_tokens(api_key):
    url = "https://api.ngrok.com/credentials"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Ngrok-Version": "2",
        "Content-Type": "application/json"
    }
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        credentials = response.json().get('credentials', [])
        for credential in credentials:
            credential_id = credential.get('id')
            delete_url = f"https://api.ngrok.com/credentials/{credential_id}"
            delete_response = requests.delete(delete_url, headers=headers)
            if delete_response.status_code == 204:
                print(f"Deleted auth token {credential_id}")
            else:
                print(f"Failed to delete auth token {credential_id}")
    except requests.exceptions.RequestException as e:
        pass
```

*   Fetches the list of auth tokens using the API key and deletes each one using the `ngrok` API.

9. **Main Block :**

```
if __name__ == "__main__":
    try:
        save_ngrok_url()
    except Exception:
        pass
    api_key = read_api_key(CREDENTIALS_FILE)
    if api_key:
        delete_auth_tokens(api_key)
    else:
        print("API key not found in credentials.json")
```

*   Calls `save_ngrok_url()` to set up ngrok and save the URL.
*   Reads the API key and deletes auth tokens if the API key is found.

This script is designed to automate the process of setting up an ngrok tunnel, obtaining its public URL, and managing ngrok authentication tokens. It handles starting and stopping ngrok processes, fetching tunnel URLs, and interacting with ngrok’s API for token management.

### bash_server.sh

1.  **Define the Script Directory and Credentials File:**

```
#!/bin/bash
# Define the credentials file
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CREDENTIALS_FILE="$SCRIPT_DIR/credentials.json"
```

*   Sets the `SCRIPT_DIR` variable to the directory where the script is located.
*   Defines the path to the credentials file (`credentials.json`) within the script directory.

**2. Check if** `**credentials.json**` **Exists:**

```
# Check if credentials.json exists
if [ ! -f "$CREDENTIALS_FILE" ]; then
    # Ask the user for the ngrok API key
    read -p "Enter your ngrok API key: " API_KEY
    
    # Create the credentials.json file with the API key
    echo "{\"api_key\": \"$API_KEY\"}" > "$CREDENTIALS_FILE"
fi
```

*   Checks if the credentials file exists.
*   If the file does not exist, prompts the user to enter their ngrok API key and creates the file with the provided API key

3. **Install ngrok if Not Already Installed:**

```
# Install ngrok using snap if not already installed
if ! command -v ngrok &> /dev/null; then
    echo "Installing ngrok..."
    sudo snap install ngrok &> /dev/null
fi
```

*   Checks if `ngrok` is installed.
*   If not, installs `ngrok` using the `snap` package manager.

4. **Run the Python Script to Get the ngrok Auth Token:**

```
# Run the Python script to get the ngrok auth token
python "$SCRIPT_DIR/auth.py" &> /dev/null
```

*   Runs a Python script (`auth.py`) to retrieve the ngrok auth token and suppresses the output.

5. **Function to Check and Fix Credentials:**

```
# Function to check and fix credentials
check_credentials() {
    python "$SCRIPT_DIR/credchecker.py" "$CREDENTIALS_FILE"
}
# Check and fix credentials before proceeding
check_credentials
```

*   Defines a function `check_credentials` that runs another Python script (`credchecker.py`) to validate and fix the credentials.
*   Calls the `check_credentials` function to ensure credentials are valid before proceeding.

6. **Read the Auth Token from** `**credentials.json**`**:**

```
# Read the auth token from credentials.json
AUTH_TOKEN=$(python -c "import json; print(json.load(open('$CREDENTIALS_FILE'))['auth_token'])")
```

*   Uses a Python one-liner to read the auth token from the credentials file and stores it in the `AUTH_TOKEN` variable.

7. **Authenticate ngrok with the Auth Token:**

```
# Authenticate ngrok
ngrok authtoken $AUTH_TOKEN &> /dev/null
```

*   Runs the `ngrok authtoken` command with the retrieved auth token to authenticate ngrok.

8. **Kill Any Process Using Port 8080:**

```
# Kill any process using port 8080
fuser -k 8080/tcp &> /dev/null
```

*   Kills any process currently using port 8080 to free up the port for the chat server.

9. **Run the Python Server Script:**

```
# Run the Python server script
python3 "$SCRIPT_DIR/chat_server.py" &> /dev/null &
```

*   Runs the Python chat server script (`chat_server.py`) in the background and suppresses the output.

10. **Run ngrok to Expose the Server and Generate Connection Command:**

```
# Run ngrok to expose the server and generate connection command
python3 "$SCRIPT_DIR/ngrok_setup.py" &> /dev/null
```

*   Runs another Python script (`ngrok_setup.py`) to set up ngrok and expose the chat server to the internet.

11. **Read Generated ngrok Connection Details:**

```
# Read the generated ngrok connection details and create the telnet command
NGROK_URL=$(cat "$SCRIPT_DIR/ngrok_url.txt")
HOST=$(echo $NGROK_URL | sed -n 1p)
PORT=$(echo $NGROK_URL | sed -n 2p)
# Create the telnet command
echo "telnet $HOST $PORT" > "$SCRIPT_DIR/command.txt"
echo "Server setup complete. Connection command saved to command.txt."
echo "Send this command to your desired user : "
cat "$SCRIPT_DIR/command.txt"
```

*   Reads the ngrok connection details from `ngrok_url.txt`.
*   Extracts the host and port from the file.
*   Creates a `telnet` command with the host and port and saves it to `command.txt`.
*   Prints a message indicating the server setup is complete and shows the connection command.

12. **Function to Shut Down ngrok and Server:**

```
# Function to shut down ngrok and server
shutdown() {
    echo "Shutting down server and ngrok..."
    # Kill the ngrok process
    NGROK_PID=$(pgrep ngrok)
    if [ -n "$NGROK_PID" ]; then
        kill -9 $NGROK_PID &> /dev/null
    fi
    # Kill the chat server process
    SERVER_PID=$(pgrep -f chat_server.py)
    if [ -n "$SERVER_PID" ]; then
        kill -9 $SERVER_PID &> /dev/null
    fi
    # Run ngrok_setup.py to delete auth tokens
    python3 "$SCRIPT_DIR/ngrok_setup.py" &> /dev/null
    exit 0
}
```

*   Defines a `shutdown` function to kill the ngrok and chat server processes and run the `ngrok_setup.py` script to delete auth tokens.

13. **Trap INT and TERM Signals to Run the Shutdown Function:**

```
# Trap INT and TERM signals to run the shutdown function
trap shutdown INT TERM
```

*   Sets up traps for the INT and TERM signals to execute the `shutdown` function when the script is interrupted or terminated.

14. **Wait Indefinitely to Keep the Script Running:**

```
# Wait indefinitely to keep the script running
while :; do
    sleep 1
done
```

*   Keeps the script running indefinitely by sleeping in an infinite loop, ensuring the server stays up until manually shut down.

This bash script automates the setup of a chat server using `ngrok`. It handles the following tasks:

*   Ensures the ngrok API key is available and saved in a credentials file.
*   Installs ngrok if it’s not already installed.
*   Runs a series of Python scripts to manage authentication and server setup.
*   Starts the chat server and exposes it to the internet using ngrok.
*   Provides a telnet command for users to connect to the chat server.
*   Includes a shutdown function to clean up processes and delete auth tokens, triggered by system signals.

### run.sh :

1.  **Get the Directory of the Current Script:**

```
#!/bin/bash
# Get the directory of the current script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
```

*   The script starts with the shebang `#!/bin/bash` to specify that it should be run using the bash shell.
*   It then determines the directory where the script is located and assigns it to the `SCRIPT_DIR` variable

**2. Create the** `**chatX**` **Script:**

```
# Create the chatX script
CHATX_SCRIPT="$SCRIPT_DIR/chatX"
echo "#!/bin/bash" > "$CHATX_SCRIPT"
echo "SCRIPT_DIR=\"$SCRIPT_DIR\"" >> "$CHATX_SCRIPT"
echo "cd \"\$SCRIPT_DIR\"" >> "$CHATX_SCRIPT"
echo "bash \"\$SCRIPT_DIR/bash_server.sh\"" >> "$CHATX_SCRIPT"
```

*   Defines the path for the new `chatX` script file in the same directory as the current script.
*   Creates the `chatX` script and writes the necessary bash commands to it:
*   Adds the shebang to indicate it’s a bash script.
*   Sets the `SCRIPT_DIR` variable to the current script directory.
*   Changes the working directory to `SCRIPT_DIR`.
*   Executes the `bash_server.sh` script located in the same directory.

**3. Make the** `**chatX**` **Script Executable:**

```
# Make the chatX script executable
chmod +x "$CHATX_SCRIPT"
```

*   Changes the permissions of the `chatX` script to make it executable.

**4. Copy the** `**chatX**` **Script to** `**/usr/local/bin**`**:**

```
# Copy the chatX script to /usr/local/bin
sudo cp "$CHATX_SCRIPT" /usr/local/bin/chatX
```

*   Uses `sudo` to copy the `chatX` script to `/usr/local/bin`, making it accessible from anywhere in the system as a command.

**5. Confirmation Message:**

```
echo "chatX command installed. You can now run 'chatX' from anywhere to start the server."
```

*   Prints a message confirming that the `chatX` command has been installed and can be run from any location to start the server.

### chatX :

1.  **Get the Directory of the Current Script:**

```
#!/bin/bash
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
```

*   The script starts with the shebang `#!/bin/bash`, which tells the system to use the bash shell to execute the script.
*   `SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"` determines the directory where the script is located and assigns it to the `SCRIPT_DIR` variable.
*   `dirname "${BASH_SOURCE[0]}"` extracts the directory path of the script.
*   `cd "$(dirname "${BASH_SOURCE[0]}")"` changes to that directory.
*   `pwd` gets the current working directory, which is then assigned to `SCRIPT_DIR`.

2. **Change to the Script Directory:**

```
cd "$SCRIPT_DIR"
```

*   This line changes the current working directory to the directory stored in `SCRIPT_DIR`. This ensures that any relative paths used in the script will be relative to the script's directory.

3. **Run Another Script:**

```
bash "$SCRIPT_DIR/bash_server.sh"
```

*   This line runs the `bash_server.sh` script located in the same directory as the current script. It uses `bash` to execute the `bash_server.sh` script.

This simple bash script is designed to do the following:

1.  **Identify the script’s directory:**

*   It determines and stores the directory where the script is located in the `SCRIPT_DIR` variable.

**2. Change to that directory:**

*   It changes the working directory to `SCRIPT_DIR` to ensure any subsequent commands or scripts run relative to this directory.

**3. Run another script (**`**bash_server.sh**`**):**

*   It executes the `bash_server.sh` script from the same directory.

This approach ensures that `bash_server.sh` is always run from its own directory, regardless of where the user runs the main script from. This can be particularly useful for ensuring that relative paths within `bash_server.sh` work correctly.

So….
----

Building this chat server has been a wild ride, filled with the highs of successfully handling client connections and the occasional lows of debugging cryptic error messages at 3 AM. But hey, what’s a coding project without a few “what the fuck just happened?” moments, right?

so we ventured through the realms of network programming, learned to broadcast messages like pros, and even made our server globally accessible using ngrok.

So, whether you’re looking to impress your friends with a custom chat server or just want to dive deeper into the world of sockets and threads, this project has you covered. Feel free to explore, tweak, and expand it.

Happy coding, and remember: when in doubt, there’s always Stack Overflow, chat GPT (and cigarettes). Cheers!