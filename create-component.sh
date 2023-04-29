#!/bin/bash

# Check if at least one parameter is provided
if [ -z "$1" ]
  then
    echo "Error: No component name provided"
    exit 1
fi

# Split the first parameter by the forward slash character
IFS="/" read -ra params <<< "$1"

# Get the name of the component and convert first letter to uppercase
component_name=$(echo "${params[-1]}" | awk '{print toupper(substr($0,0,1)) tolower(substr($0,2))}')

# Construct the component directory path from the other parameters
component_dir="src"
for ((i=0; i<$((${#params[@]}-1)); i++))
do
  component_dir="$component_dir/${params[i]}"
done
component_dir="$component_dir/$component_name"

# Check if the component directory already exists
if [ -d "$component_dir" ]; then
  echo "Error: Component $component_name already exists in $component_dir"
  exit 1
fi

# Create the component directory and files
mkdir -p "$component_dir"
touch "$component_dir/$component_name.tsx"
touch "$component_dir/$component_name.css"

# Write the contents to the component file
cat > "$component_dir/$component_name.tsx" << EOF
import './$component_name.css'

function $component_name() {
  return (
    <>
      <p>hello world</p>
    </>
  )
}

export default $component_name
EOF

# Print success message
echo "Component $component_name created successfully in $component_dir"