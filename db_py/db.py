from msilib.schema import Error
from mysql import connector

connection_ = connector.connect( user="root",host="127.0.0.1",password="",database="activelearn" )
cursor = connection_.cursor()







def readAll_():
  try:
    cursor.execute("SELECT * FROM aldata")
    data = cursor.fetchall()
    return data 
  except connector.Error as ex:
    print( ex ) 
    return ["Error Getting Data"]




def readAll():
  try:
    cursor.execute("SELECT * FROM aldata")
    data = cursor.fetchall()
    # print( data )
    # connection_.close()
    # cursor.close()
    return data 
  except connector.Error as ex:
    print( ex ) 
    return ["Error Getting Data"]
    

# edit data into database
def update( id, text, sentiment, language ):
  try:
    q = f"UPDATE `aldata` SET `sentence`='{text}', `sentiment`='{sentiment}', `language`='{language}' WHERE id={id}"
    cursor.execute(q)
    count = cursor.rowcount
    connection_.commit()
    print( "Row Count:", count )
    return count
  except connector.Error as ex:
    return False


# insert data into database 
def insert( text, sentiment,language):
  try:
    q = f"INSERT INTO aldata (`sentence`,`sentiment`,`language`) VALUES('{text}','{sentiment}','{language}')"
    cursor.execute(q)
    count = cursor.rowcount
    connection_.commit()
    return count
  except connector.Error as ex:
    return False

# readAll()
# insert("dummy", 1)
# update(37, "dummy", -1 )