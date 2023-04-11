<%@ WebService Language="C#" Class="Core2" %>

using System;
using System.Web;
using System.Web.Services;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;
using System.Configuration;
using System.Xml.Serialization;


[WebService(Namespace = "CoilcraftCore2")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class Core2  : System.Web.Services.WebService {

     SqlConnection cn = new SqlConnection();
     SqlDataReader dr;
     SqlCommand cmd;

     //string cnSecurity = ConfigurationManager.ConnectionStrings["20160210"].ToString();
     //string BOS2Cn = ConfigurationManager.ConnectionStrings["BOS2"].ToString();
     string cnstr = ConfigurationManager.ConnectionStrings["BOS2"].ToString();

     SqlConnection SpeedCn = new SqlConnection();
     SqlCommand SpeedCmd;
     string SpeedCnstr = ConfigurationManager.ConnectionStrings["BOS2"].ToString();

     //Dictionary<string, object> ELO = new Dictionary<string, object>();


     private string ReadUserKey()
     {
          string UserKey = "Not Found";
          if (HttpContext.Current.Request.Cookies[(ConfigurationManager.AppSettings["UserKeyCookie"].ToString())] != null)
          {
               UserKey = HttpContext.Current.Request.Cookies[(ConfigurationManager.AppSettings["UserKeyCookie"].ToString())]["UserKey"].ToString();
          }

          return UserKey;
     }


     [WebMethod]
     public string CoreCookieLogout()
     {
          string StartPage = ConfigurationManager.AppSettings["StartPage"].ToString();
          cn.ConnectionString = cnstr;
          cmd = new SqlCommand("R2018_DefaultLogout", cn);
          cmd.CommandType = CommandType.StoredProcedure;
          cmd.Parameters.AddWithValue("UserKey", ReadUserKey());
          cn.Open();
          cmd.ExecuteNonQuery();
          cn.Close();

          // Deletes cookie from Javascript
          HttpContext.Current.Response.Cookies[(ConfigurationManager.AppSettings["UserKeyCookie"].ToString())].Expires = DateTime.Now.AddDays(-2d);

          return StartPage;
     }




     [WebMethod]
     public void CoreSpeedRecord(DateTime SpeedClientStart, DateTime SpeedClientFinish, DateTime SpeedSQLStart, DateTime SpeedSQLFinish, Dictionary<string, string> CoreObj)
     {
          string UserKey = ReadUserKey();
          SpeedCn.ConnectionString = SpeedCnstr;
          SpeedCmd = new SqlCommand("R2018_SpeedTransactionSave", SpeedCn);
          SpeedCmd.CommandType = CommandType.StoredProcedure;
          SpeedCmd.Parameters.AddWithValue("@SpeedUserKey", UserKey);
          SpeedCmd.Parameters.AddWithValue("@SpeedClientStart", SpeedClientStart);
          SpeedCmd.Parameters.AddWithValue("@SpeedClientFinish", SpeedClientFinish);
          SpeedCmd.Parameters.AddWithValue("@SpeedSQLStart", SpeedSQLStart);
          SpeedCmd.Parameters.AddWithValue("@SpeedSQLFinish", SpeedSQLFinish);
          SpeedCmd.Parameters.AddWithValue("@SpeedDatabase", CoreObj["Database"]);
          SpeedCmd.Parameters.AddWithValue("@SpeedFormName", CoreObj["FormName"]);
          SpeedCmd.Parameters.AddWithValue("@SpeedStoredProcedure", CoreObj["StoredProcedure"]);
          SpeedCn.Open();
          SpeedCmd.ExecuteNonQuery();
          SpeedCn.Close();
     }



     [WebMethod]
     public string Identity(string StoredProcedure, int ID)
     {
          string UserName = "None";
          cn.ConnectionString = cnstr;
          cmd = new SqlCommand(StoredProcedure, cn);
          cmd.CommandType = CommandType.StoredProcedure;
          cmd.Parameters.AddWithValue("UserKey", ReadUserKey());
          cmd.Parameters.AddWithValue("ID", ID);
          cn.Open();
          dr = cmd.ExecuteReader();
          if (dr.Read())
          {
               UserName = dr["UserName"].ToString();
          }
          dr.Close();
          cn.Close();
          return UserName;
     }




     [WebMethod]
     public string Developer()
     {
          string Result = "Done";
          cn.ConnectionString = cnstr;
          cmd = new SqlCommand("R2018_CoreDeveloper", cn);
          cmd.CommandType = CommandType.StoredProcedure;
          cmd.Parameters.AddWithValue("UserKey", ReadUserKey());
          cn.Open();
          cmd.ExecuteNonQuery();
          cn.Close();
          return Result;
     }




     //[WebMethod]
     //public Boolean PasswordChange(string Login, string Password, string Confirm)
     //{
     //	Boolean Result = false;
     //	cn.ConnectionString = cnstr;
     //	cmd = new SqlCommand("R2018_CorePasswordChangeSave", cn);
     //	cmd.CommandType = CommandType.StoredProcedure;
     //	cmd.Parameters.AddWithValue("@Login", Login);
     //	cmd.Parameters.AddWithValue("@Password", Password);
     //	cmd.Parameters.AddWithValue("@Confirm", Confirm);
     //	cn.Open();
     //	dr = cmd.ExecuteReader();
     //	if (dr.Read())
     //	{
     //		Result = Convert.ToBoolean(dr["Result"]);

     //		HttpCookie myCookie = new HttpCookie("BOSUK20160711");
     //		myCookie["UserKey"] = dr["UserKey"].ToString();
     //		HttpContext.Current.Response.Cookies.Add(myCookie);

     //	}
     //	dr.Close();
     //	cn.Close();
     //	return Result;
     //}


     [WebMethod]
     public Dictionary<string, object> CoreDataTransfer(Dictionary<string, string> CoreObj, Dictionary<string, string> CoreParameters)
     {
          // Final Return Dictionary 
          Dictionary<string, object> FRD = new Dictionary<string, object>();
          // File Return List
          List<object> FRL = new List<object>();

          // Initialize Variables
          int Start = Convert.ToInt32(CoreObj["CoreStart"]);
          int Increment = Convert.ToInt32(CoreObj["CoreIncrement"]);
          int OriginalIncrement = Convert.ToInt32(CoreObj["CoreOriginalIncrement"]);
          int ServerID = 0;
          int UserID = 0;
          int Access = -1;
          string Database = CoreObj["Database"];
          FRD.Add("Access", -1);
          FRD.Add("CoreTotal", 0);
          FRD.Add("Increment", 0);
          FRD.Add("UserKey", ReadUserKey());
          FRD.Add("Error", "NoError");
          FRD.Add("LevelID", 0);
          FRD.Add("Speed", 0);
          FRD.Add("BgImg", "Default.jpg");
          FRD.Add("SpeedSQLStart", DateTime.Now.ToString());
          FRD.Add("StartPage", ConfigurationManager.AppSettings["StartPage"].ToString());
          try
          {
               // -------------------------------------
               // Check Security
               // -------------------------------------



               cn.ConnectionString = cnstr;
               cmd = new SqlCommand("R2018_CoreSecuritySelect", cn);
               cmd.CommandType = CommandType.StoredProcedure;
               cmd.Parameters.AddWithValue("@FormName", CoreObj["FormName"].ToString());
               cmd.Parameters.AddWithValue("@SecurityObject", CoreObj["SecurityObject"].ToString());
               cmd.Parameters.AddWithValue("@UserKey", ReadUserKey());


               cn.Open();
               dr = cmd.ExecuteReader();

               if (dr.Read())
               {
                    ServerID = Convert.ToInt32(dr["ServerID"]);
                    UserID = Convert.ToInt32(dr["UserID"]);
                    Access = Convert.ToInt32(dr["UserAccess"]);
                    FRD["LevelID"] = dr["LevelID"].ToString();
                    FRD["IdentityName"] = dr["UserName"].ToString();
                    FRD["Identity"] = (ServerID != UserID);
                    FRD["Access"] = Convert.ToInt32(dr["UserAccess"]);
                    FRD["Speed"] = Convert.ToBoolean(dr["Speed"]);
                    FRD["FormTitle"] = dr["FormTitle"].ToString();
               }

               dr.NextResult();

               List<object> ORL = new List<object>();
               while (dr.Read())
               {
                    Dictionary<string, string> ORD = new Dictionary<string, string>();
                    ORD.Add("ObjectName", dr["ObjectName"].ToString());
                    ORD.Add("ObjectState", dr["ObjectState"].ToString());
                    ORL.Add(ORD);
               }
               FRD.Add("SecurityObjects", ORL);


               // ----------------------------------------------
               // Write Session Information 
               // ----------------------------------------------

               dr.Close();

               string CoreParms = "";
               foreach (KeyValuePair<string, string> KVP in CoreParameters)
               {
                    CoreParms += KVP.Key + ":" + KVP.Value + ",<br/> ";
               }


               cmd = new SqlCommand("R2018_CoreSessionSave", cn);
               cmd.CommandType = CommandType.StoredProcedure;
               cmd.Parameters.AddWithValue("@TransferType", CoreObj["TransferType"]);
               cmd.Parameters.AddWithValue("@DatabaseName", CoreObj["Database"]);
               cmd.Parameters.AddWithValue("@FormName", CoreObj["FormName"]);
               cmd.Parameters.AddWithValue("@StoredProcedure", CoreObj["StoredProcedure"]);
               cmd.Parameters.AddWithValue("@SecurityObject", CoreObj["SecurityObject"]);
               cmd.Parameters.AddWithValue("@Parameters", CoreParms);
               cmd.Parameters.AddWithValue("@UserID", ServerID);
               cmd.Parameters.AddWithValue("@PostDate", DateTime.Now);
               cmd.ExecuteNonQuery();



               dr.Close();
               cn.Close();

               if (Access > 0)
               {

                    // -------------------------------------
                    // Check Users Increment Preference
                    // -------------------------------------
                    if (CoreObj["TransferType"] == "Paging") {
                         if(OriginalIncrement == 0 || Increment != OriginalIncrement)
                         {
                              //cn.ConnectionString = cnstr;
                              cmd = new SqlCommand("R2018_CorePagePreferences", cn);
                              cmd.CommandType = CommandType.StoredProcedure;
                              cmd.Parameters.AddWithValue("@FormName", CoreObj["FormName"]);
                              cmd.Parameters.AddWithValue("@StoredProcedure", CoreObj["StoredProcedure"]);
                              cmd.Parameters.AddWithValue("@Increment", Increment);
                              cmd.Parameters.AddWithValue("@OriginalIncrement", OriginalIncrement);
                              cmd.Parameters.AddWithValue("@UserID", ServerID);
                              cn.Open();
                              dr = cmd.ExecuteReader();
                              if (dr.Read())
                              {
                                   Increment = Convert.ToInt32(dr["Increment"]);
                              }
                              dr.Close();
                              cn.Close();
                         }
                    }

                    // Record the paging increment
                    FRD["Increment"] = Increment;


                    // -------------------------------------
                    // Primary Data Reader Object
                    // -------------------------------------     
                    cn.ConnectionString = ConfigurationManager.ConnectionStrings[Database].ToString();
                    cmd = new SqlCommand(CoreObj["StoredProcedure"], cn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    // Add Parameters
                    foreach (KeyValuePair<string, string> KVP in CoreParameters)
                    {
                         cmd.Parameters.AddWithValue("@" + KVP.Key, KVP.Value);
                    }

                    // Add Server_Client_None as needed
                    switch (CoreObj["TransferType"])
                    {
                         case "Delete": break;
                         case "Save": cmd.Parameters.AddWithValue("@UserID", ServerID); cmd.Parameters.AddWithValue("@PostDate", DateTime.Now); break;
                         default:
                              if (CoreObj["Server_Client_None"] != "None")
                              {
                                   cmd.Parameters.AddWithValue("@UserID", UserID);
                              }
                              break;
                    }

                    // Add Paging as needed
                    if (CoreObj["TransferType"] == "Paging")
                    {
                         cmd.Parameters.AddWithValue("@Start", Increment * Start - Increment + 1);
                         cmd.Parameters.AddWithValue("@Finish", Increment * Start);
                    }
                    cn.Open();
                    dr = cmd.ExecuteReader();

                    int FieldCount = dr.FieldCount;
                    List<object> RL = new List<object>();
                    Boolean FoundCoreTotal = false;
                    while (dr.Read())
                    {
                         Dictionary<string, string> RD = new Dictionary<string, string>();
                         for (int i = 0; i < FieldCount; i++)
                         {
                              if (dr.GetName(i).ToLower() == "coretotal")
                              {
                                   FRD["CoreTotal"] = dr[dr.GetName(i)].ToString();
                                   FoundCoreTotal = true;
                              }
                              else
                              {
                                   RD.Add(dr.GetName(i), dr[dr.GetName(i)].ToString());
                              }
                         }
                         if (FoundCoreTotal == false) { RL.Add(RD); }
                    }
                    if (FoundCoreTotal == false) { FRL.Add(RL); }

                    while (dr.NextResult())
                    {
                         FieldCount = 0;
                         FieldCount = dr.FieldCount;
                         RL = new List<object>();
                         FoundCoreTotal = false;
                         while (dr.Read())
                         {
                              Dictionary<string, string> RD = new Dictionary<string, string>();
                              for (int i = 0; i < FieldCount; i++)
                              {
                                   if (dr.GetName(i).ToLower() == "coretotal")
                                   {
                                        FRD["CoreTotal"] = dr[dr.GetName(i)].ToString();
                                        FoundCoreTotal = true;
                                   }
                                   else
                                   {
                                        RD.Add(dr.GetName(i), dr[dr.GetName(i)].ToString());
                                   }
                              }
                              if (FoundCoreTotal == false) { RL.Add(RD); }
                         }
                         if (FoundCoreTotal == false) { FRL.Add(RL); }
                    }
                    FRD.Add("DATA", FRL);

               }

          }
          catch (Exception ex)
          {
               Dictionary<string, object> ERD = new Dictionary<string, object>();
               ERD = ProcessError(ex, CoreObj, CoreParameters);
               FRD["Error"] = ERD["Error"];
               FRD["LevelID"] = ERD["LevelID"];
               return FRD;
          }
          finally{
               dr.Close();
               cn.Close();

          }
          FRD.Add("SpeedSQLFinish", DateTime.Now.ToString());
          return FRD;
     }



     [WebMethod(enableSession: true)]
     private Dictionary<string,object> ProcessError(Exception ex, Dictionary<string, string> CoreObj, Dictionary<string,string> CoreParameters)
     {
               string CoreParms = "";
               foreach (KeyValuePair<string, string> KVP in CoreParameters)
               {
                    CoreParms += KVP.Key + ":" + KVP.Value + ",<br/> ";
               }

          Dictionary<string,object> ERD = new Dictionary<string, object>();
          ERD["Error"] = GetErrorInformation(ex);
          ERD["LevelID"] = 0;
          cn.Dispose();
          cn.ConnectionString = cnstr;
          cmd = new SqlCommand("X_ErrorDetectionSave", cn);
          cmd.CommandType = CommandType.StoredProcedure;
          cmd.Parameters.AddWithValue("@ErrorFormName", CoreObj["FormName"].ToString());
          cmd.Parameters.AddWithValue("@ErrorStoredProcedure", CoreObj["StoredProcedure"].ToString());
          cmd.Parameters.AddWithValue("@ErrorParameters", CoreParms);
          cmd.Parameters.AddWithValue("@ErrorType", ex.GetType().Name);
          cmd.Parameters.AddWithValue("@ErrorContent", ERD["Error"]);
          cmd.Parameters.AddWithValue("@UserKey", ReadUserKey());
          cn.Open();
          dr = cmd.ExecuteReader();
          if (dr.Read())
          {
               ERD["LevelID"] = dr["LevelID"].ToString();
          }
          dr.Close();
          cn.Close();
          return ERD  ;
     }



     private string GetErrorInformation(Exception ex)
     {
          string helpLink = (ex.HelpLink == null ? "None" : ex.HelpLink);
          string message = (ex.Message == null ? "None" : ex.Message);
          string source = (ex.Source == null ? "None" : ex.Source);
          string targetSite = ex.TargetSite.ToString();
          targetSite = (targetSite == null ? "None" : targetSite);
          string stackTrace = ex.StackTrace;
          stackTrace = (stackTrace == null ? "None" : stackTrace);

          return " Exception = " + ex.GetType().Name +
                            "<br/><br/> HelpLink = " + helpLink +
                            "<br/><br/><div style='color:red;'> Message = " + message + "</div>" +
                            "<br/> Source = " + source +
                            "<br/><br/> StackTrace = " + stackTrace +
                            "<br/><br/> TargetSite = " + targetSite;
     }

}