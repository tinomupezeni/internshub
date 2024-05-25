import pandas as pd

# Read the dataset
df = pd.read_csv('training2.csv')

# Duplicate the entries to increase the dataset size
df_expanded = pd.concat([df] * 10, ignore_index=True)

# Check the new size of the dataset
print("Expanded dataset size:", len(df_expanded))

# Now you can proceed with training your model on the expanded dataset and evaluate its performance.