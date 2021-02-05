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
    public class BillingController : Controller
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

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /// <summary>
        /// Registro de Facturas de Venta
        /// </summary>
        /// <returns></returns>
        [ValidateSession]
        public ActionResult NewSalesInvoices()
        {
            if (CheckSession())
            {
                ViewBag.Clients = (from b in db.tbl_ClientProv where b.ClientProvType == "C" && b.Status == "A" select b).ToList();
                ViewBag.Fecha = DateTime.Now.Year + "-" + DateTime.Now.ToString("MM") + "-" + DateTime.Now.ToString("dd");
                // ViewBag.Patients = (from b in db.tbl_Patients where b.Status == "A" select b).ToList();
                ViewBag.Orders = (from b in db.tbl_ComentsOrder where b.Status==0 select b).ToList();
                ViewBag.Inventario = (from b in db.tbl_Inventory where b.WarehouseCode==1 select b).ToList();
                return View();
            }
            else
            {
                return RedirectToAction("Logout", "Account");
            }
        }

        [ValidateSession]
        public ActionResult EditSalesInvoices(string IdSale)
        {
            if (CheckSession())
            {
                //ViewBag.Clients = (from b in db.tbl_ClientProv where b.ClientProvType == "C" && b.Status == "A" select b).ToList();
                //ViewBag.Fecha = DateTime.Now.Year + "-" + DateTime.Now.ToString("MM") + "-" + DateTime.Now.ToString("dd");
                var Id = Convert.ToInt32(IdSale);
                var Sale = (from f in db.tbl_Sales where f.IdSale == Id select f).FirstOrDefault();
                ViewBag.Sale = (from f in db.tbl_Sales where f.IdSale == Id select f).FirstOrDefault();
                ViewBag.SaleDetail = (from f in db.tbl_SalesDetail where f.IdSale == Id select f).ToList();
                ViewBag.Client = (from f in db.tbl_ClientProv where f.IdClientProv == Sale.IdClient select f).FirstOrDefault();
                ViewBag.Orders = (from b in db.tbl_ComentsOrder where b.Status == 0 select b).ToList();
                return View();
            }
            else
            {
                return RedirectToAction("Logout", "Account");
            }
        }

        [ValidateSession]
        public JsonResult GetInfoClient(int IdClient)
        {
            JsonResult jr = new JsonResult();
            try
            {
                var Client = (from f in db.tbl_ClientProv where f.IdClientProv == IdClient select f).FirstOrDefault();
                var PriceList = (from f in db.tbl_PriceListDetail where f.IdPriceList == Client.IdPriceList select f).ToList();
                jr.Data = new { PriceList = PriceList, Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                var Client = (from f in db.tbl_ClientProv where f.IdClientProv == IdClient select f).FirstOrDefault();
                var PriceList = (from f in db.tbl_PriceListDetail where f.IdPriceList == Client.IdPriceList select f).ToList();
                jr.Data = new { PriceList = PriceList, Res = false };
                return jr;
            }
        }

        [ValidateSession]
        public JsonResult SaveSale(string NumAtCard)
        {
            JsonResult jr = new JsonResult();
            try
            {
                if (String.IsNullOrEmpty(NumAtCard))
                {
                    return jr;
                }
                int IdSale = 0;
                IdSale = (from f in db.tbl_Sales where f.NumAtCard == NumAtCard select f.IdSale).FirstOrDefault();
                if (IdSale!=0)
                {
                    db.SP_SAVESALE(IdSale);
                    jr.Data = new { Res = true };
                }
                else
                {
                    jr.Data = new { Res = false };
                }
                return jr;
            }
            catch (Exception ex)
            {
                jr.Data = new { Res = false };
                return jr;
            }
        }

        [ValidateSession]
        public JsonResult SavePurchase(string NumAtCard)
        {
            JsonResult jr = new JsonResult();
            try
            {
                if (String.IsNullOrEmpty(NumAtCard))
                {
                    return jr;
                }
                int IdPurchase = 0;
                IdPurchase = (from f in db.tbl_Purchase where f.NumAtCard == NumAtCard select f.IdPurchase).FirstOrDefault();
                if (IdPurchase != 0)
                {
                    db.SP_SAVEPURCHASE(IdPurchase);
                    jr.Data = new { Res = true };
                }
                else
                {
                    jr.Data = new { Res = false };
                }
                return jr;
            }
            catch (Exception ex)
            {
                jr.Data = new { Res = false };
                return jr;
            }
        }

        [ValidateSession]
        public JsonResult AddSalesDocItem(int IdClient, int IdComentsOrder, string NumAtCard, DateTime DocDate, string FlgNew,
                                          string ItemCode, string ItemName, int Quantity, decimal UnitPrice, string SalesType)
        {
            JsonResult jr = new JsonResult();
            try
            {
                if (String.IsNullOrEmpty(NumAtCard))
                {
                    return jr;
                }
                int IdSale = 0;
                IdSale = (from f in db.tbl_Sales where f.NumAtCard == NumAtCard select f.IdSale).FirstOrDefault();

                if (FlgNew=="S" && IdSale==0)
                {                    
                    tbl_Sales Item = new tbl_Sales();
                    Item.IdClient = IdClient;
                    Item.IdComentsOrder = IdComentsOrder;
                    Item.NumAtCard = NumAtCard;
                    Item.DocDate = DocDate;
                    Item.SalesType = SalesType;
                    Item.SubTotal = 0;
                    Item.IVA = 0;
                    Item.Perception = 0;
                    Item.DocTotal = 0;
                    Item.Status = "E";
                    Item.CreateUser = Session["Email"].ToString();
                    Item.CreateDate = DateTime.Now;

                    
                    db.tbl_Sales.Add(Item);
                    db.SaveChanges();

                    IdSale = (from f in db.tbl_Sales where f.NumAtCard == NumAtCard select f.IdSale).FirstOrDefault();
                }
                else
                {
                    var OldSale = (from f in db.tbl_Sales where f.NumAtCard == NumAtCard select f).FirstOrDefault();
                    OldSale.SalesType = SalesType;
                    OldSale.IdComentsOrder = IdComentsOrder;
                    db.SaveChanges();
                }

                //insetar articulo
                if (IdSale != 0)
                {
                    db.SP_InsertItemSale(IdSale, IdClient, ItemCode, ItemName, Quantity, UnitPrice);
                    var Sale = (from f in db.tbl_Sales where f.NumAtCard == NumAtCard select f).FirstOrDefault();
                    var SaleDetail = (from f in db.tbl_SalesDetail where f.IdSale == IdSale select f).ToList();
                    jr.Data = new { Sale = Sale, SaleDetail = SaleDetail, Message = 0, Res = true };
                }
                

                return jr;
            }
            catch (Exception ex)
            {
               // var tblPriceListDetails = (from b in db.tbl_PriceListDetail where b.IdPriceList == IdPriceList select b).ToList();
                //jr.Data = new { tblPriceListDetail = tblPriceListDetails, Res = false };
                return jr;
            }
        }

        [ValidateSession]
        public JsonResult UpdateSalesDocItem(int IdClient, string NumAtCard, DateTime DocDate, string FlgNew,
                                         string ItemCode, string ItemName, int Quantity, decimal UnitPrice, int IdComentsOrder, string SalesType)
        {
            JsonResult jr = new JsonResult();
            try
            {
                int IdSale = 0;
                IdSale = (from f in db.tbl_Sales where f.NumAtCard == NumAtCard select f.IdSale).FirstOrDefault();

                var OldSale = (from f in db.tbl_Sales where f.NumAtCard == NumAtCard select f).FirstOrDefault();
                OldSale.SalesType = SalesType;
                OldSale.IdComentsOrder = IdComentsOrder;
                db.SaveChanges();

                if (IdSale != 0)
                {
                    //insetar articulo
                    db.SP_UpdateItemSale(IdSale, IdClient, ItemCode, ItemName, Quantity, UnitPrice);
                    var Sale = (from f in db.tbl_Sales where f.NumAtCard == NumAtCard select f).FirstOrDefault();
                    var SaleDetail = (from f in db.tbl_SalesDetail where f.IdSale == IdSale select f).ToList();
                    jr.Data = new { Sale = Sale, SaleDetail = SaleDetail, Message = 0, Res = true };
                }

                return jr;
            }
            catch (Exception ex)
            {
                // var tblPriceListDetails = (from b in db.tbl_PriceListDetail where b.IdPriceList == IdPriceList select b).ToList();
                //jr.Data = new { tblPriceListDetail = tblPriceListDetails, Res = false };
                return jr;
            }
        }

        [ValidateSession]
        public JsonResult DeleteSalesDocItem(int IdClient, string NumAtCard, DateTime DocDate, string FlgNew,
                                         string ItemCode, string ItemName, int Quantity, decimal UnitPrice, int IdComentsOrder, string SalesType)
        {
            JsonResult jr = new JsonResult();
            try
            {
                int IdSale = 0;
                IdSale = (from f in db.tbl_Sales where f.NumAtCard == NumAtCard select f.IdSale).FirstOrDefault();


                var OldSale = (from f in db.tbl_Sales where f.NumAtCard == NumAtCard select f).FirstOrDefault();
                OldSale.SalesType = SalesType;
                OldSale.IdComentsOrder = IdComentsOrder;
                db.SaveChanges();

                if (IdSale != 0)
                {
                    //insetar articulo
                    db.SP_DeleteItemSale(IdSale, IdClient, ItemCode, ItemName, Quantity, UnitPrice);
                    var Sale = (from f in db.tbl_Sales where f.NumAtCard == NumAtCard select f).FirstOrDefault();
                    var SaleDetail = (from f in db.tbl_SalesDetail where f.IdSale == IdSale select f).ToList();
                    jr.Data = new { Sale = Sale, SaleDetail = SaleDetail, Message = 0, Res = true };
                }
                
                return jr;
            }
            catch (Exception ex)
            {
                // var tblPriceListDetails = (from b in db.tbl_PriceListDetail where b.IdPriceList == IdPriceList select b).ToList();
                //jr.Data = new { tblPriceListDetail = tblPriceListDetails, Res = false };
                return jr;
            }
        }



        [ValidateSession]
        public JsonResult UpdateSale(int IdClient, string NumAtCard,int IdComentsOrder, string SalesType)
        {
            JsonResult jr = new JsonResult();
            try
            {
                var OldSale = (from f in db.tbl_Sales where f.NumAtCard == NumAtCard select f).FirstOrDefault();
                OldSale.IdClient = IdClient;
                OldSale.SalesType = SalesType;
                OldSale.IdComentsOrder = IdComentsOrder;
                db.SaveChanges();

                if (SalesType=="F")
                {
                    var IVA = (from p in db.tbl_Parameters where p.IdParameters == 4 select p.ValueOfParameter).FirstOrDefault();
                    var SubTotal = (from p in db.tbl_Sales where p.IdSale == OldSale.IdSale select p.SubTotal).FirstOrDefault();

                    OldSale.IVA = SubTotal * (Convert.ToInt32(IVA) /(decimal)100);
                    OldSale.DocTotal = SubTotal + (SubTotal * (Convert.ToInt32(IVA) / (decimal)100));
                    db.SaveChanges();
                }
                else
                {
                    OldSale.IVA = 0;
                    OldSale.DocTotal = OldSale.SubTotal;
                    db.SaveChanges();
                }

                jr.Data = new { Sale= OldSale, Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                jr.Data = new { Res = false };
                return jr;
            }
        }



        [ValidateSession]
        public ActionResult Orders()
        {
            if (CheckSession())
            {
                ViewBag.Clients = (from b in db.tbl_ClientProv where b.ClientProvType == "C" && b.Status == "A" select b).ToList();
                ViewBag.Fecha = DateTime.Now.Year + "-" + DateTime.Now.ToString("MM") + "-" + DateTime.Now.ToString("dd");
                ViewBag.Orders = (from b in db.tbl_ComentsOrder select b).ToList();
                return View();
            }
            else
            {
                return RedirectToAction("Logout", "Account");
            }
        }

        [ValidateSession]
        public ActionResult PrintOrder(int id)
        {
            if (CheckSession())
            {
                CreatePDF pdf = new CreatePDF();
                ViewBag.FileName = pdf.CreatePFDOrder(id);
                return View();
            }
            else
            {
                return RedirectToAction("Logout", "Account");
            }
        }

        [ValidateSession]
        public JsonResult AddComentsOrder(tbl_ComentsOrder Coment)
        {
            JsonResult jr = new JsonResult();
            try
            {
                tbl_ComentsOrder OldComent = (from f in db.tbl_ComentsOrder where f.IdComentsOrder == Coment.IdComentsOrder select f).FirstOrDefault();
                if (OldComent!=null)
                {
                    OldComent.CardCode = Coment.CardCode;
                    OldComent.CardName = (from c in db.tbl_ClientProv where c.IdClientProv == Coment.CardCode select c.ClienteProvName).FirstOrDefault();
                    OldComent.DateIn = Coment.DateIn;
                    OldComent.DateTest = Coment.DateTest;
                    OldComent.DateSent = Coment.DateSent;
                    OldComent.DatePromis = Coment.DatePromis;
                    OldComent.Description = Coment.Description;
                    OldComent.Attachment = Coment.Attachment;
                    OldComent.Status = Coment.Status;
                    db.SaveChanges();
                }
                else
                {
                    Coment.CardCode = Coment.CardCode;
                    Coment.CardName = (from c in db.tbl_ClientProv where c.IdClientProv==Coment.CardCode select c.ClienteProvName).FirstOrDefault();
                    Coment.Status = Coment.Status;
                    Coment.CreateUser = Session["Email"].ToString();
                    Coment.CreateDate = DateTime.Now;
                    db.tbl_ComentsOrder.Add(Coment);
                    db.SaveChanges();
                }


                OldComent = (from f in db.tbl_ComentsOrder where f.IdComentsOrder == Coment.IdComentsOrder select f).FirstOrDefault();

                var Orders = (from b in db.tbl_ComentsOrder select b).ToList();
                jr.Data = new { Orders= Orders, Coment = OldComent,  Message = "Orden Resgistrado con Éxito", Res = true };
                


                return jr;
            }
            catch (Exception ex)
            {
                // var tblPriceListDetails = (from b in db.tbl_PriceListDetail where b.IdPriceList == IdPriceList select b).ToList();
                //jr.Data = new { tblPriceListDetail = tblPriceListDetails, Res = false };
                return jr;
            }
        }

        [ValidateSession]
        public JsonResult DeleteComentsOrder(int id)
        {
            JsonResult jr = new JsonResult();
            try
            {
                //int Coment = 0;
                var  Coment = (from f in db.tbl_ComentsOrder where f.IdComentsOrder == id select f).FirstOrDefault();

                if (Coment != null)
                {
                    db.tbl_ComentsOrder.Remove(Coment);
                    db.SaveChanges();
                }
                var Orders = (from b in db.tbl_ComentsOrder select b).ToList();
                jr.Data = new { Orders = Orders, Message = "Orden Eliminada con Éxito", Res = true };

                return jr;
            }
            catch (Exception ex)
            {
                var Orders = (from b in db.tbl_ComentsOrder select b).ToList();
                jr.Data = new { Orders = Orders, Message = "Orden no pudo ser eliminada", Res = false };

                return jr;
            }
        }

        [ValidateSession]
        public JsonResult Get_PDFOrder(int id)
        {
            JsonResult jr = new JsonResult();
            try
            {
                var ruta = (from c in db.tbl_Parameters
                            where c.IdParameters == 12
                            select c.ValueOfParameter).FirstOrDefault();
                CreatePDF pdf = new CreatePDF();
                var FileName = pdf.CreatePFDOrder(id);
                var path = FileName;


                jr.Data = new { Path = path,  Message = "Orden Obtenida con Éxito", Res = true };



                return jr;
            }
            catch (Exception ex)
            {

                jr.Data = new { Path = "", Message = "Orden Obtenida sin Éxito", Res = false };
                
                return jr;
            }
           
        }
        [ValidateSession]
        public ActionResult DownloadPDFOrder(int id)
        {
            try
            {
                var ruta = (from c in db.tbl_Parameters
                            where c.IdParameters == 12
                            select c.ValueOfParameter).FirstOrDefault();
                CreatePDF pdf = new CreatePDF();
                var FileName = pdf.CreatePFDOrder(id);
                var path = ruta + FileName;
                return File(path, "application/pdf", FileName);
            }
            catch (Exception ex)
            {

                return RedirectToAction("Orders", "Billing");
            }

        }

        [ValidateSession]
        public ActionResult DownloadPDFSales(string id)
        {
            try
            {
                var ruta = (from c in db.tbl_Parameters
                            where c.IdParameters == 5
                            select c.ValueOfParameter).FirstOrDefault();
                CreatePDF pdf = new CreatePDF();
                var FileName = pdf.CreatePFDSale(id);
                var path = ruta + FileName;
                return File(path, "application/pdf", FileName);
            }
            catch (Exception ex)
            {

                return RedirectToAction("SalesInvoices", "Billing");
            }

        }


        [ValidateSession]
        public ActionResult PrintSale(string id)
        {
            if (CheckSession())
            {
                CreatePDF pdf = new CreatePDF();
                ViewBag.FileName = pdf.CreatePFDSale(id);
                return View();
            }
            else
            {
                return RedirectToAction("Logout", "Account");
            }
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /// <summary>
        /// Registro de Facturas de Compra
        /// </summary>
        /// <returns></returns>
        [ValidateSession]
        public ActionResult NewPurchaseInvoices()
        {
            if (CheckSession())
            {
                ViewBag.Providers = (from b in db.tbl_ClientProv where b.ClientProvType == "P" && b.Status == "A" select b).ToList();
                ViewBag.Fecha = DateTime.Now.Year + "-" + DateTime.Now.ToString("MM") + "-" + DateTime.Now.ToString("dd");
                // ViewBag.Patients = (from b in db.tbl_Patients where b.Status == "A" select b).ToList();
                // ViewBag.Rates = (from b in db.tbl_Rates select b).ToList();
                //ViewBag.Inventario = (from b in db.tbl_Inventory select b).ToList();
                return View();
            }
            else
            {
                return RedirectToAction("Logout", "Account");
            }
        }

        [ValidateSession]
        public ActionResult EditPurchaseInvoices(string IdPurchase)
        {
            if (CheckSession())
            {
                var Id = Convert.ToInt32(IdPurchase);
                var Purchase = (from f in db.tbl_Purchase where f.IdPurchase == Id select f).FirstOrDefault();
                ViewBag.Purchase = (from f in db.tbl_Purchase where f.IdPurchase == Id select f).FirstOrDefault();
                ViewBag.PurchaseDetail = (from f in db.tbl_PurchaseDetail where f.IdPurchase == Id select f).ToList();
                ViewBag.Provider = (from f in db.tbl_ClientProv where f.IdClientProv == Purchase.IdProvider select f).FirstOrDefault();
                return View();
            }
            else
            {
                return RedirectToAction("Logout", "Account");
            }
        }

        [ValidateSession]
        public JsonResult GetInfoPrivider(int IdProvider)
        {
            JsonResult jr = new JsonResult();
            try
            {
                var Provider = (from f in db.tbl_ClientProv where f.IdClientProv == IdProvider select f).FirstOrDefault();
                var PriceList = (from f in db.tbl_Inventory select f).ToList();
                jr.Data = new { PriceList = PriceList, Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                var Client = (from f in db.tbl_ClientProv where f.IdClientProv == IdProvider select f).FirstOrDefault();
                var PriceList = (from f in db.tbl_Inventory select f).ToList();
                jr.Data = new { PriceList = PriceList, Res = false };
                return jr;
            }
        }

        [ValidateSession]
        public JsonResult AddPurchaseDocItem(int IdProvider, string NumAtCard, DateTime DocDate, string FlgNew,
                                          string ItemCode, string ItemName, int Quantity, decimal UnitPrice)
        {
            JsonResult jr = new JsonResult();
            try
            {
                if (String.IsNullOrEmpty(NumAtCard))
                {
                    return jr;
                }
                int IdPurchase = 0;
                IdPurchase = (from f in db.tbl_Purchase where f.NumAtCard == NumAtCard select f.IdPurchase).FirstOrDefault();

                if (FlgNew == "S" && IdPurchase == 0)
                {
                    tbl_Purchase Item = new tbl_Purchase();
                    Item.IdProvider = IdProvider;
                    Item.NumAtCard = NumAtCard;
                    Item.DocDate = DocDate;
                    Item.PurchaseType = "P";
                    Item.SubTotal = 0;
                    Item.IVA = 0;
                    //Item.Perception = 0;
                    Item.DocTotal = 0;
                    Item.Status = "E";
                    Item.UserCreate = Session["Email"].ToString();
                    Item.CreateDate = DateTime.Now;


                    db.tbl_Purchase.Add(Item);
                    db.SaveChanges();

                    IdPurchase = (from f in db.tbl_Purchase where f.NumAtCard == NumAtCard select f.IdPurchase).FirstOrDefault();
                }

                //insetar articulo
                if (IdPurchase != 0)
                {
                    db.SP_InsertItemPurchase(IdPurchase, IdProvider, ItemCode, ItemName, Quantity, UnitPrice);
                    var Purchase = (from f in db.tbl_Purchase where f.IdPurchase == IdPurchase select f).FirstOrDefault();
                    var PurchaseDetail = (from f in db.tbl_PurchaseDetail where f.IdPurchase == IdPurchase select f).ToList();
                    Purchase = (from f in db.tbl_Purchase where f.IdPurchase == IdPurchase select f).FirstOrDefault();
                    jr.Data = new { Purchase = Purchase, PurchaseDetail = PurchaseDetail, Message = 0, Res = true };
                }


                return jr;
            }
            catch (Exception ex)
            {
                // var tblPriceListDetails = (from b in db.tbl_PriceListDetail where b.IdPriceList == IdPriceList select b).ToList();
                //jr.Data = new { tblPriceListDetail = tblPriceListDetails, Res = false };
                return jr;
            }
        }

        [ValidateSession]
        public JsonResult UpdatePurchaseDocItem(int IdProvider, string NumAtCard, DateTime DocDate, string FlgNew,
                                         string ItemCode, string ItemName, int Quantity, decimal UnitPrice)
        {
            JsonResult jr = new JsonResult();
            try
            {
                int IdPurchase = 0;
                IdPurchase = (from f in db.tbl_Purchase where f.NumAtCard == NumAtCard select f.IdPurchase).FirstOrDefault();



                //insetar articulo
                if (IdPurchase != 0)
                {
                    db.SP_UpdateItemPurchase(IdPurchase, IdProvider, ItemCode, ItemName, Quantity, UnitPrice);
                    var Purchase = (from f in db.tbl_Purchase where f.NumAtCard == NumAtCard select f).FirstOrDefault();
                    var PurchaseDetail = (from f in db.tbl_PurchaseDetail where f.IdPurchase == IdPurchase select f).ToList();
                    jr.Data = new { Purchase = Purchase, PurchaseDetail = PurchaseDetail, Message = 0, Res = true };
                }

                return jr;
            }
            catch (Exception ex)
            {
                // var tblPriceListDetails = (from b in db.tbl_PriceListDetail where b.IdPriceList == IdPriceList select b).ToList();
                //jr.Data = new { tblPriceListDetail = tblPriceListDetails, Res = false };
                return jr;
            }
        }

        [ValidateSession]
        public JsonResult DeletePurchaseDocItem(int IdProvider, string NumAtCard, DateTime DocDate, string FlgNew,
                                         string ItemCode, string ItemName, int Quantity, decimal UnitPrice)
        {
            JsonResult jr = new JsonResult();
            try
            {
                int IdPurchase = 0;
                IdPurchase = (from f in db.tbl_Purchase where f.NumAtCard == NumAtCard select f.IdPurchase).FirstOrDefault();



                //insetar articulo
                if (IdPurchase != 0)
                {
                    db.SP_DeleteItemPurchase(IdPurchase, IdProvider, ItemCode, ItemName, Quantity, UnitPrice);
                    var Purchase = (from f in db.tbl_Purchase where f.NumAtCard == NumAtCard select f).FirstOrDefault();
                    var PurchaseDetail = (from f in db.tbl_PurchaseDetail where f.IdPurchase == IdPurchase select f).ToList();
                    jr.Data = new { Purchase = Purchase, PurchaseDetail = PurchaseDetail, Message = 0, Res = true };
                }
                return jr;
            }
            catch (Exception ex)
            {
                // var tblPriceListDetails = (from b in db.tbl_PriceListDetail where b.IdPriceList == IdPriceList select b).ToList();
                //jr.Data = new { tblPriceListDetail = tblPriceListDetails, Res = false };
                return jr;
            }
        }

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        [ValidateSession]
        public ActionResult SalesInvoices()
        {
            if (CheckSession())
            {
                var fecha1 = new DateTime();
                var fecha2 = new DateTime();
                if (DateTime.Now.Month==12)
                {
                    fecha1 = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
                    fecha2 = new DateTime(DateTime.Now.Year+1, 1, 1).AddDays(-1);
                }
                else
                {
                    fecha1 = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
                    fecha2 = new DateTime(DateTime.Now.Year, DateTime.Now.Month + 1, 1).AddDays(-1);
                }
                
                ViewBag.SalesInvoices = db.SP_GET_SALES_BY_DATE(fecha1, fecha2).ToList();
                ViewBag.Fecha = DateTime.Now.Year + "-" + DateTime.Now.ToString("MM") ;
                return View();
            }
            else
            {
                return RedirectToAction("Logout", "Account");
            }
        }

        [ValidateSession]
        public JsonResult GetSalesByDate(string Date)
        {
            JsonResult jr = new JsonResult();
            try
            {
                var fecha1 = Convert.ToDateTime(Date + "-01");
                var fecha2 = new DateTime();
                if (DateTime.Now.Month == 12)
                {
                    fecha2 = new DateTime(fecha1.Year + 1, 1, 1).AddDays(-1);
                }
                else if (fecha1.Month == 12)
                {
                    fecha2 = new DateTime(fecha1.Year + 1, 1, 1).AddDays(-1);
                }
                else
                {
                    fecha2 = new DateTime(fecha1.Year, fecha1.Month + 1, 1).AddDays(-1);
                }

                var SalesInvoices = db.SP_GET_SALES_BY_DATE(fecha1, fecha2).ToList();

                jr.Data = new { SalesInvoices = SalesInvoices, Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                jr.Data = new { SalesInvoices = "", Res = false };
                return jr;
            }
        }

        [ValidateSession]
        public JsonResult GetInfoInvoice(int IdSale)
        {
            JsonResult jr = new JsonResult();
            try
            {
                var Sale = (from f in db.tbl_Sales where f.IdSale == IdSale select f).FirstOrDefault();
                var SaleDetail = (from f in db.tbl_SalesDetail where f.IdSale == IdSale select f).ToList();
                var Client = (from f in db.tbl_ClientProv where f.IdClientProv == Sale.IdClient select f).FirstOrDefault();

                jr.Data = new { Sale = Sale, Client=Client, SaleDetail = SaleDetail, Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                jr.Data = new { Sale = "", SaleDetail = "", Res = false };
                return jr;
            }
        }

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        [ValidateSession]
        public ActionResult PurchaseInvoices()
        {
            if (CheckSession())
            {
                var fecha1 = new DateTime();
                var fecha2 = new DateTime();
                if (DateTime.Now.Month == 12)
                {
                    fecha1 = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
                    fecha2 = new DateTime(DateTime.Now.Year + 1, 1, 1).AddDays(-1);
                }
                else
                {
                    fecha1 = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
                    fecha2 = new DateTime(DateTime.Now.Year, DateTime.Now.Month + 1, 1).AddDays(-1);
                }
                ViewBag.PurchaseInvoices = db.SP_GET_PURCHASE_BY_DATE(fecha1, fecha2).ToList();
                ViewBag.Fecha = DateTime.Now.Year + "-" + DateTime.Now.ToString("MM");
                return View();
            }
            else
            {
                return RedirectToAction("Logout", "Account");
            }
        }

        [ValidateSession]
        public JsonResult GetPurchaseByDate(string Date)
        {
            JsonResult jr = new JsonResult();
            try
            {
                var fecha1 = Convert.ToDateTime(Date + "-01");
                var fecha2 = new DateTime();
                if (DateTime.Now.Month == 12)
                {
                    fecha2 = new DateTime(fecha1.Year + 1, 1, 1).AddDays(-1);
                }
                else
                {
                    fecha2 = new DateTime(fecha1.Year, fecha1.Month + 1, 1).AddDays(-1);
                }

                var PurchaseInvoices = db.SP_GET_PURCHASE_BY_DATE(fecha1, fecha2).ToList();

                jr.Data = new { PurchaseInvoices = PurchaseInvoices, Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                jr.Data = new { PurchaseInvoices = "", Res = false };
                return jr;
            }
        }

        [ValidateSession]
        public JsonResult GetInfoPurchase(int IdPurchase)
        {
            JsonResult jr = new JsonResult();
            try
            {
                var Purchase = (from f in db.tbl_Purchase where f.IdPurchase == IdPurchase select f).FirstOrDefault();
                var PurchaseDetail = (from f in db.tbl_PurchaseDetail where f.IdPurchase == IdPurchase select f).ToList();
                var Provider = (from f in db.tbl_ClientProv where f.IdClientProv == Purchase.IdProvider select f).FirstOrDefault();

                jr.Data = new { Purchase = Purchase, Provider= Provider, PurchaseDetail = PurchaseDetail, Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                jr.Data = new { Purchase = "", PurchaseDetail = "", Res = false };
                return jr;
            }
        }


    }
}