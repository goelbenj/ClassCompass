# This script is used to build, up, and down the docker-compose services
# Usage: ./dev.ps1 -command build -service flask-server -flaskPort 5001 -reactPort 5002 -hostname localhost

# Parameters
param (
    [string]$command,
    [string]$service,
    [int]$flaskPort = 5001,
    [int]$reactPort = 5002,
    [string]$hostname = "localhost"
)

# Set environment variables
$env:FLASK_PORT = $flaskPort
$env:REACT_PORT = $reactPort
$env:HOSTNAME = $hostname

# Check if the service is valid
if ($service -eq "flask-server") {
    $service = "flask-server"
} elseif ($service -eq "react-app") {
    $service = "react-app"
} elseif(!$service) {
}
else {
    Write-Output "Invalid service. Please use 'flask-server' or 'react-app' or leave it empty."
}

# Execute the command
switch ($command) {
    "build" {
        if ($service) { docker compose build $service } else { docker compose build }
    }
    "up" {
        if ($service) { docker compose up $service } else { docker compose up }
    }
    "down" {
        if ($service) { docker compose down $service } else { docker compose down }
    }
    default {
        Write-Output "Invalid command. Please use 'build', 'up', or 'down'."
    }
}