import pandas
import datetime

# Read data files
wtg_df = pandas.read_csv('Datasets/WTG_raw_table.csv')
project_df = pandas.read_csv('Datasets/Project_raw_table.csv')

# Join tables on project id
joined_df = project_df.join(wtg_df.set_index('project_id'), on='id')

# Group projects by id and concatenate WTG numbers
wtg_sr = joined_df.groupby('id')['WTG_number'].apply(lambda x : ';'.join(x))
wtg_sr.name = 'WTG_numbers'

# Create series of kw totals by project number
kw_sr = joined_df.groupby('id')['kW'].apply(sum)
kw_sr.name = 'kWs'

# Join the series to the projects df
grouped_df = project_df.join(wtg_sr, on='id').join(kw_sr, on='id')

# Calculate months and append as new column
def calc_months(acqu):
    acqu = pandas.to_datetime(acqu, format="%Y-%m-%d")
    today = datetime.datetime.now()
    return (today.year - acqu.year) * 12 + (today.month - acqu.month)

grouped_df['months_acquired'] = grouped_df['acquisition_date'].apply(calc_months)

# Filter out projects under 11 months
grouped_df = grouped_df[grouped_df['months_acquired'] > 11]

# Sort alphabetically by project name and reindex
grouped_df = grouped_df.sort_values('project_name').reset_index(drop=True).drop(columns=['id'])

# Save to excel
grouped_df.to_excel("Exports/project_view_table.xlsx")

# --- Coordinates

# Save raw WTG table to excel for coordinate retrieval from the backend
wtg_df.to_excel("Exports/WTG_raw_table.xlsx")



# --- Resources ---

# ER Diagrams
## https://www.lucidchart.com/pages/er-diagrams
## https://www.smartdraw.com/entity-relationship-diagram/

# Python
## https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.join.html
# https://pandas.pydata.org/pandas-docs/stable/reference/frame.html

# Python virtual env reminders (bash)
## mbaro@DESKTOP-1DO3RPD MINGW64 ~/Documents/Q-Energy/Tasks/1_data_processing
## $ source venv/Scripts/activate
## $ pip install pandas
## $ pip install openpyxl
## $ deactivate