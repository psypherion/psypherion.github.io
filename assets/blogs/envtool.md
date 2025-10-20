envtool : create & manage python environments easily
====================================================

[![Sayan Sarkar](https://miro.medium.com/v2/resize:fill:64:64/1*ckonRVccCJQthJrZ8fZFvw@2x.jpeg)](https://medium.com/?source=post_page---byline--5d1d298c2e74---------------------------------------)

[Sayan Sarkar](https://medium.com/?source=post_page---byline--5d1d298c2e74---------------------------------------)

4 min read

·

Jun 11, 2024

[nameless link](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fvote%2Fp%2F5d1d298c2e74&operation=register&redirect=https%3A%2F%2Fpsypherion.medium.com%2Fenvtool-create-manage-python-environments-easily-5d1d298c2e74&user=Sayan+Sarkar&userId=33445fab81c5&source=---header_actions--5d1d298c2e74---------------------clap_footer------------------)

--

[nameless link](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fbookmark%2Fp%2F5d1d298c2e74&operation=register&redirect=https%3A%2F%2Fpsypherion.medium.com%2Fenvtool-create-manage-python-environments-easily-5d1d298c2e74&source=---header_actions--5d1d298c2e74---------------------bookmark_footer------------------)

Listen

Share

> well, what can I say I am too lazy to type “python3 -m venv env_name” each time I needed to create an environment and after that I had to install requirements by “pip install -r requirements.txt” ….. Well, It’s too much work for me.Especially when the struggle is between choosing a gun to your head and end it all or choosing coffee to keep on working (I am sisyphus fr). That’s why I wrote this script just so I can be a bit more lazy nothing else. It’s me and my laziness against the world. xd

![captionless image](https://miro.medium.com/v2/resize:fit:564/format:webp/1*mVPJm-F-WKAAa9HsaI0gxw.png)

`envtool` is a Bash script designed to simplify the management of Python virtual environments. With `envtool`, you can create & manage virtual environments effortlessly. This guide will walk you through cloning the `envtool` repository, setting it up, and using its features.

Step 1: Cloning the Repository
------------------------------

First, you need to clone the `envtool` repository from GitHub. Open your terminal and run:

```
git clone https://github.com/psypherion/envtool.git
cd envtool
```

Step 2: Give execution permission
---------------------------------

```
chmod +x run.sh
```

This will download the repository to your local machine and navigate you into the project directory.

Step 3: Installing envtool
--------------------------

Next, you need to install the `envtool` script. The `run.sh` script provided in the repository handles this installation process. Execute the following command in your terminal:

```
./run.sh
```

This script will:

1.  Copy the `envtool` script to `/usr/local/bin` for global accessibility.
2.  Make the script executable.

Ensure you have the necessary permissions to copy files to `/usr/local/bin`. You might need to prepend the command with `sudo` if you encounter permission issues.

Step 4: Using envtool
---------------------

With `envtool` installed, you can now manage your Python project environments effortlessly.

Creating a Virtual Environment
------------------------------

To create a new virtual environment, use the `-n` option followed by the desired environment name:

```
envtool -n myenv
```

This command will:

1.  Prompt you for confirmation.
2.  Create a new virtual environment named `myenv`.
3.  Activate the environment.
4.  Check for a `requirements.txt` file and install the listed packages, or prompt you to create one if it doesn’t exist.

![envtool with pre specified environment name](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*T_MTDwVLlaQsWvoHnBfzdg.png)

> or,

```
envtool
```

1.  It’ll create the python environment named : “_current_directory-env_”

![envtool without specifying environment name](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*9d1m8E1JJbYISL2g77zc1Q.png)

Detailed Script Breakdown
-------------------------

Let’s explore the main parts of the `envtool` script:

### 1. Environment Creation (`env_creator` function)

This function handles the creation of the virtual environment. It prompts the user for confirmation before proceeding:

```
env_creator() {
  local env_name="$1"
  read -p "Do you want to continue? (Y/n): " choice
  case "$choice" in
    y|Y|"")
      echo "Creating environment $env_name"
      python3 -m venv "$env_name"
      echo "$env_name created successfully"
      ;;
    n|N)
      echo "Exiting program."
      exit 0
      ;;
    *)
      echo "Invalid input. Exiting program."
      exit 1
      ;;
  esac
}
```

### 2. Requirements File Handling (`create_requirements_file` function)

This function prompts the user to create a `requirements.txt` file if it doesn’t exist and allows them to specify the packages to include:

```
create_requirements_file() {
  read -p "No requirements.txt file found. Do you want to create it? (Y/n): " choice
  case "$choice" in
    y|Y|"")  # If Y/y or Enter (default)
      read -p "Enter package names separated by commas or spaces: " packages
      # Filter out "os" package from the input
      packages=$(echo "$packages" | tr ', ' ' ' | tr ' ' '\n' | grep -v '^os$')
      echo "$packages" > requirements.txt
      echo "requirements.txt created with the following packages:"
      cat requirements.txt
      ;;
    n|N)  # If N/n
      echo "Exiting without creating requirements.txt."
      exit 0
      ;;
    *)
      echo "Invalid input. Exiting program."
      exit 1
      ;;
  esac
}
```

### 3. Package Installation (`checker` function)

This function checks if a `requirements.txt` file exists and installs the listed packages using `pip`:

```
checker() {
  if [ -f "requirements.txt" ]; then
    echo "requirements.txt found."
    echo "Installing packages..."
    pip install -r requirements.txt
  else
    create_requirements_file
    pip install -r requirements.txt
  fi
}
```

Conclusion
----------

With `envtool`, you can simplify the management of Python virtual environments, ensuring a smooth and consistent setup process. By following this guide, you can clone, install, and effectively use `envtool` to enhance your Python development workflow.

For more details, visit the [**_envtool GitHub repository_**](https://github.com/ky13-troj/envtool). Happy coding!