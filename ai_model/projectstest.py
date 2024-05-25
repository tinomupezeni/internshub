import pandas as pd
import random

# Define the programs and their corresponding projects
programs = {
    "Software Engineering": ["Web Application Development", "Mobile App Development", "Data Analysis"],
    "Hardware Engineering": ["Microcontroller Design", "Embedded Systems", "Robotics"],
    "Computer Engineering": ["Network Security", "Artificial Intelligence", "Computer Vision"],
    "Law": ["Intellectual Property Rights", "Contract Law", "Cyber Law"],
    "Accounts": ["Financial Analysis", "Tax Planning", "Auditing"]
}

# Generate the dataset
data = []
total_rows = 1000

for _ in range(total_rows):
    program = random.choice(list(programs.keys()))
    project = random.choice(programs[program])
    data.append([program, project])

# Create a Pandas DataFrame
df = pd.DataFrame(data, columns=["program", "description"])

# # Ensure projects are relevant to student programs
# df["Project Program"] = df.groupby("Student Program")["Project Program"].transform(lambda x: random.choice(x))

# Save the dataset to a CSV file
df.to_csv("student_projects.csv", index=False)