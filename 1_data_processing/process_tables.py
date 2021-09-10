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

# Filter projects under 11 months
grouped_df = grouped_df[grouped_df['months_acquired'] > 11]

# Sort alphabetically by project name and reindex
grouped_df = grouped_df.sort_values('project_name').reset_index(drop=True)

# Save to excel
grouped_df.to_excel("Exports/project_view_table.xlsx")

# (Save raw WTG table to excel for coordinate retrieval from the backend)
wtg_df.to_excel("Exports/WTG_raw_table.xlsx")


# joined['kW'] = joined.groupby('project_id')['kW'].agg(sum)
# print("Kw:", joined)


# acqu_group = joined.groupby('project_id')['acquisition_date'].apply(lambda x : calc_months(x))


# print(acqu_group)


# Create Project View table
# Initialize working df
# wtg_info = pandas.DataFrame()

# # Iterate project ids
# for p_id in projects['id']:

#     # Retrive corresponding wtgs
#     corress_wtgs = wtgs[wtgs['project_id'] == p_id]

#     # Concatenate WTG numbers of all corresponding WTGs
#     wtg_numbers = ';'.join(corress_wtgs['WTG_number'].tolist())

#     # Sum up kW total of all corresponding WTGs
#     kws = sum(corress_wtgs['kW'])

#     # Calculate months since acquisition
#     acqu_date = projects[projects['id'] == p_id]['acquisition_date'].values[0]
#     acqu_date = pandas.to_datetime(acqu_date, format="%Y-%m-%d")
#     today_date = datetime.datetime.now()
#     months = (today_date.year - acqu_date.year) * 12 + (today_date.month - acqu_date.month)

#     # Append data to working df
#     wtg_info = wtg_info.append([{'project_id': p_id, 'WTG_numbers': wtg_numbers, 'kW': kws, 'months_acquired': months}])

# # Join working df with project df
# project_view = projects.join(wtg_info.set_index('project_id'), on='id')

# # Filter projects over 11 months
# project_view = project_view[project_view['months_acquired'] > 11]

# # Sort projects by name
# project_view = project_view.sort_values('project_name')

# # Resent indexes
# project_view = project_view.reset_index(drop=True)

# # Save df to excel file



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