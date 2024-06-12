# Setup Instructions for privateGPT

This guide will walk you through the steps required to set up and run the privateGPT model using WSL and other necessary tools.

## Step 1: Install WSL and Ubuntu

1. **Install WSL:**
   Open PowerShell as an administrator and run:
   ```sh
   wsl --install

    Install Ubuntu:
    Ubuntu should be installed automatically with the above command. If not, you can manually install it from the Microsoft Store.

    Uninstall Ubuntu (if needed):
    To uninstall Ubuntu, run:

    sh

    wsl --unregister Ubuntu

Step 2: Configure pyenv and Poetry in WSL

    Open WSL:
    In PowerShell, run:

    sh

wsl

Set up pyenv:
Run the following command to install pyenv:

sh

curl https://pyenv.run/ | bash

After running the above command, you will need to perform two additional steps to complete the setup:

a. Configure .bashrc:
Copy the first command (similar to command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH") and add it to .bashrc:

sh

nano .bashrc

Paste the command at the end of the file, save, and exit:

    Press CTRL + X
    Press Y to confirm
    Press ENTER

b. Configure .profile:
Copy the second command (similar to eval "$(pyenv init -...)") and add it to .profile:

sh

nano .profile

Paste the command at the end of the file, save, and exit:

    Press CTRL + X
    Press Y to confirm
    Press ENTER

Set up Poetry:
Install Poetry by running:

sh

    curl -sSL https://install.python-poetry.org/ | python3 -

Step 3: Install and Run privateGPT

    Create a Project Folder:
    In WSL, navigate to your home directory and create a project folder:

    sh

cd ~
mkdir -p ~/Project
cd ~/Project

Clone the privateGPT Repository:

sh

git clone https://github.com/zylon-ai/private-gpt
cd private-gpt

Install Python 3.11 with pyenv:

sh

pyenv install 3.11
pyenv local 3.11

Install Dependencies with Poetry:

sh

poetry install --extras "ui llms-llama-cpp embeddings-huggingface vector-stores-qdrant"

Run Setup Script:

sh

poetry run python scripts/setup

Run the Application:

sh

PGPT_PROFILES=local make run

Access the Application:
Open your browser and go to:

sh

    http://localhost:8001/

By following these steps, you should have the privateGPT model up and running.
