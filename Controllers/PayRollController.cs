using CLINIC.Classes;
using CLINIC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CLINIC.Controllers
{
    [ValidateSession]
    public class PayRollController : Controller
    {
        private CLINICEntities db = new CLINICEntities();

        public Boolean CheckSession()
        {
            try
            {
                if (Session["UserId"].ToString() == null)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }

        // GET: PayRoll
        [ValidateSession]
        public ActionResult Employes()
        {
            if (CheckSession())
            {
                ViewBag.Employes = (from b in db.tbl_PAYROLL_Employes select b).ToList();
                ViewBag.Fecha = DateTime.Now.Year + "-" + DateTime.Now.ToString("MM") + "-" + DateTime.Now.ToString("dd");
                return View();
            }
            else
            {
                return RedirectToAction("Logout", "Account");
            }
        }


        public JsonResult AddEmploye(tbl_PAYROLL_Employes Employe)
        {
            JsonResult jr = new JsonResult();
            try
            {
                Employe.CreateDate = DateTime.Now;
                Employe.CreateUser = Session["Email"].ToString();
                db.tbl_PAYROLL_Employes.Add(Employe);
                db.SaveChanges();
                var Employes = (from b in db.tbl_PAYROLL_Employes select b).ToList();
                jr.Data = new { Employes = Employes, Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                var Employes = (from b in db.tbl_PAYROLL_Employes select b).ToList();
                jr.Data = new { Employes = Employes, Res = false };
                return jr;
            }
        }


        public JsonResult UpdateEmploye(tbl_PAYROLL_Employes Employe)
        {
            JsonResult jr = new JsonResult();
            try
            {
                var OldEmploye = (from p in db.tbl_PAYROLL_Employes where p.IdEmploye == Employe.IdEmploye select p).FirstOrDefault();

                OldEmploye.EmployeName = Employe.EmployeName;
                OldEmploye.EmployeLastName = Employe.EmployeLastName;
                OldEmploye.DUI = Employe.DUI;
                OldEmploye.NIT = Employe.NIT;
                OldEmploye.Address = Employe.Address;
                OldEmploye.Phone = Employe.Phone;
                OldEmploye.Position = Employe.Position;
                OldEmploye.Salary = Employe.Salary;
                OldEmploye.FlgBonus = Employe.FlgBonus;
                OldEmploye.FlgCompensation = Employe.FlgCompensation;
                OldEmploye.FlgHolidays = Employe.FlgHolidays;
                OldEmploye.PaymentType = Employe.PaymentType;
                OldEmploye.HiringDate = Employe.HiringDate;
                OldEmploye.Status = Employe.Status;
                OldEmploye.UpdateUser= Session["Email"].ToString();
                OldEmploye.UpdateDate = DateTime.Now;

                db.SaveChanges();
                var Employes = (from b in db.tbl_PAYROLL_Employes select b).ToList();
                jr.Data = new { Employes = Employes, Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                var Employes = (from b in db.tbl_PAYROLL_Employes select b).ToList();
                jr.Data = new { Employes = Employes, Res = false };
                return jr;
            }
        }
        public JsonResult CreatePeyment(int IdEmploye)
        {
            JsonResult jr = new JsonResult();
            try
            {
                var Employe = (from p in db.tbl_PAYROLL_Employes where p.IdEmploye == IdEmploye select p).FirstOrDefault();

                db.SP_Create_Peyment(Employe.IdEmploye, Session["Email"].ToString());
                
                jr.Data = new {Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                jr.Data = new {Res = false };
                return jr;
            }
        }
        public JsonResult CreatePeymentALL(int IdEmploye)
        {
            JsonResult jr = new JsonResult();
            try
            {
                //var Employe = (from p in db.tbl_PAYROLL_Employes where p.IdEmploye == IdEmploye select p).FirstOrDefault();

                db.SP_Create_PeymentALL(Session["Email"].ToString());

                jr.Data = new { Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                jr.Data = new { Res = false };
                return jr;
            }
        }

        [ValidateSession]
        public ActionResult PayRolls()
        {
            if (CheckSession())
            {
                //var Month = DateTime.Now.Month;
                ViewBag.Payrolls = db.SP_GET_PAYROLLS(DateTime.Now).ToList();
                ViewBag.Fecha = DateTime.Now.Year + "-" + DateTime.Now.ToString("MM");
                ViewBag.NewFecha = DateTime.Now.ToString("yyy-MM-dd");
                return View();
            }
            else
            {
                return RedirectToAction("Logout", "Account");
            }
        }
        public JsonResult GetPeyments(string date)
        {
            JsonResult jr = new JsonResult();
            try
            {
                var Fecha = Convert.ToDateTime(date+"-01");
                var Payrolls = db.SP_GET_PAYROLLS(Fecha).ToList();

                jr.Data = new { Payrolls= Payrolls, Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                jr.Data = new { Res = false };
                return jr;
            }
        }

        [ValidateSession]
        public ActionResult DownloadPDFPayRolls(string fecha)
        {
            try
            {
                var Date = Convert.ToDateTime(fecha+"-01");
                CreatePDF pdf = new CreatePDF();
                ViewBag.FileName = pdf.CreatePFDPayRolls(Date);
                return View();
            }
            catch (Exception ex)
            {

                return RedirectToAction("PayRolls", "PayRoll");
            }

        }

       
        [ValidateSession]
        public ActionResult DownloadPDFPayRoll(int id)
        {
            try
            {
                CreatePDF pdf = new CreatePDF();
                ViewBag.FileName = pdf.CreatePFDPayRoll(id);
                return View();
            }
            catch (Exception ex)
            {

                return RedirectToAction("PayRolls", "PayRoll");
            }

        }


        [ValidateSession]
        public ActionResult DownloadPayRoll(string fecha)
        {
            try
            {
                var Date = Convert.ToDateTime(fecha + "-01");
                CreatePDF pdf = new CreatePDF();
                ViewBag.FileName = pdf.CreatePayRoll(Date);
                return View();
            }
            catch (Exception ex)
            {

                return RedirectToAction("PayRolls", "PayRoll");
            }

        }

        [ValidateSession]
        public ActionResult Advancements()
        {
            if (CheckSession())
            {
                //var Month = DateTime.Now.Month;
                ViewBag.Advancements = db.SP_GET_Advancements().ToList();
                ViewBag.Employes = (from b in db.tbl_PAYROLL_Employes select b).ToList();
                ViewBag.Fecha = DateTime.Now.ToString("yyy-MM-dd");
                return View();
            }
            else
            {
                return RedirectToAction("Logout", "Account");
            }
        }

        public JsonResult AddAdvancement(tbl_PAYROLL_Advancements Advancement)
        {
            JsonResult jr = new JsonResult();
            try
            {
                var OldAdvancement = (from p in db.tbl_PAYROLL_Advancements where p.IdAdvancements == Advancement.IdAdvancements select p).FirstOrDefault();
                if (OldAdvancement == null)
                {
                    Advancement.CreateDate = DateTime.Now;
                    Advancement.CreateUser = Session["Email"].ToString();
                    db.tbl_PAYROLL_Advancements.Add(Advancement);
                    db.SaveChanges();
                }
                else
                {
                    OldAdvancement.IdEmploye = Advancement.IdEmploye;
                    OldAdvancement.Concept = Advancement.Concept;
                    OldAdvancement.Advancements = Advancement.Advancements;
                    OldAdvancement.Refund = Advancement.Refund;
                    OldAdvancement.Pending = Advancement.Pending;
                    OldAdvancement.DateAdvancements = Advancement.DateAdvancements;
                    OldAdvancement.UpdateUser = Session["Email"].ToString();
                    OldAdvancement.UpdateDate = DateTime.Now;

                    db.SaveChanges();
                }

                var Advancements = db.SP_GET_Advancements().ToList();

                jr.Data = new { Advancements=Advancements, Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                jr.Data = new { RAdvancements = "",  es = false };
                return jr;
            }
        }

        public JsonResult ChangeDatePayRoll(int id, string date, string DatePayRolls)
        {
            JsonResult jr = new JsonResult();
            try
            {
                var NewDate = Convert.ToDateTime(date);

                var Payroll = (from p in db.tbl_PAYROLL_Payrolls where p.IdPayroll == id select p).FirstOrDefault();
                Payroll.PayDate = NewDate;
                db.SaveChanges();


                var Fecha = Convert.ToDateTime(DatePayRolls + "-01");
                var Payrolls = db.SP_GET_PAYROLLS(Fecha).ToList();

                jr.Data = new { Payrolls = Payrolls, Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                jr.Data = new { Res = false };
                return jr;
            }

        }

        public JsonResult UpdatePayRoll(int id, string date, decimal Holidays, decimal AFP, decimal ISSS, decimal Rent, decimal OtherDiscounts, decimal Bonus, decimal Compensation, decimal NetSalary, string DatePayRolls)
        {
            JsonResult jr = new JsonResult();
            try
            {
                var NewDate = Convert.ToDateTime(date);

                var Payroll = (from p in db.tbl_PAYROLL_Payrolls where p.IdPayroll == id select p).FirstOrDefault();
                Payroll.PayDate = NewDate;
                Payroll.Holidays = Holidays;
                Payroll.AFP = AFP;
                Payroll.ISSS = ISSS;
                Payroll.Rent = Rent;
                Payroll.OtherDiscounts = OtherDiscounts;
                Payroll.Bonus = Bonus;
                Payroll.Compensation = Compensation;
                Payroll.NetSalary = NetSalary;
                Payroll.UpdateDate = DateTime.Now;
                Payroll.UpdateUser = Session["Email"].ToString();
                db.SaveChanges();


                var Fecha = Convert.ToDateTime(DatePayRolls + "-01");
                var Payrolls = db.SP_GET_PAYROLLS(Fecha).ToList();

                jr.Data = new { Payrolls = Payrolls, Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                jr.Data = new { Res = false };
                return jr;
            }

        }

    }
}