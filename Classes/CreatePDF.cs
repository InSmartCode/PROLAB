using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CLINIC.Models;
using System.IO;

namespace CLINIC.Classes
{
    public class CreatePDF
    {
        CLINICEntities db = new CLINICEntities(); 
        public string CreatePFDInventory()
        {
            var PDFName = "";

            var ruta = (from c in db.tbl_Parameters
                        where c.IdParameters == 5
                        select c.ValueOfParameter).FirstOrDefault();

            ItemsCatalog reporte = new ItemsCatalog();
            
            reporte.BeginUpdate();
            PDFName = "Inventario_" + DateTime.Now.Month + DateTime.Now.Year + ".pdf";
            if (File.Exists(ruta + PDFName))
            {
                File.Delete(ruta + PDFName);
                reporte.ExportToPdf(ruta + PDFName);
            }
            else
            {
                reporte.ExportToPdf(ruta + PDFName);
            }


            return PDFName;
        }

        public string CreatePFDOrder(int id)
        {
            var PDFName = "";

            var ruta = (from c in db.tbl_Parameters
                        where c.IdParameters == 7
                        select c.ValueOfParameter).FirstOrDefault();
            tbl_ComentsOrder OldComent = (from f in db.tbl_ComentsOrder where f.IdComentsOrder == id select f).FirstOrDefault();

            Orders reporte = new Orders();
            reporte.DateIn = (DateTime)OldComent.DateIn;
            reporte.DateTest = (DateTime)OldComent.DateTest;
            reporte.DateSent = (DateTime)OldComent.DateSent;
            reporte.DatePromis = (DateTime)OldComent.DatePromis;
            reporte.Description = OldComent.Description;
            reporte.Attachment = OldComent.Attachment;
            reporte.Client = OldComent.CardName;
            reporte.NumOrder = OldComent.IdComentsOrder.ToString();
            reporte.parameter1.Value = id;
            reporte.BeginUpdate();
            PDFName = "Orden_" + DateTime.Now.Month + DateTime.Now.Year + "_"+ id + ".pdf";
            if (File.Exists(ruta + PDFName))
            {
                File.Delete(ruta + PDFName);
                reporte.ExportToPdf(ruta + PDFName);
            }
            else
            {
                reporte.ExportToPdf(ruta + PDFName);
            }


            return PDFName;
        }

        public string CreatePFDSale(string NumAtCard)
        {
            var PDFName = "";

            var ruta = (from c in db.tbl_Parameters
                        where c.IdParameters == 6
                        select c.ValueOfParameter).FirstOrDefault();
            tbl_Sales Sale = (from f in db.tbl_Sales where f.NumAtCard == NumAtCard select f).FirstOrDefault();
            tbl_ClientProv Client = (from f in db.tbl_ClientProv where f.IdClientProv == Sale.IdClient select f).FirstOrDefault();

            SalesInvoice reporte = new SalesInvoice();
            reporte.IdSale = (int)Sale.IdSale;
            reporte.Client = Client.ClienteProvName;
            reporte.NIT = Client.NIT;
            reporte.Address = Client.Address;
            reporte.Date = (DateTime)Sale.DocDate;
            reporte.NumOrder = Sale.IdComentsOrder.ToString();
            reporte.IVA = (decimal)Sale.IVA;
            reporte.Total = (decimal)Sale.DocTotal;
            reporte.parameter1.Value = (int)Sale.IdSale;

            reporte.BeginUpdate();
            PDFName = "Sale_" + NumAtCard + ".pdf";
            if (File.Exists(ruta + PDFName))
            {
                File.Delete(ruta + PDFName);
                reporte.ExportToPdf(ruta + PDFName);
            }
            else
            {
                reporte.ExportToPdf(ruta + PDFName);
            }


            return PDFName;
        }


        public string CreatePFDPayRolls(DateTime fecha)
        {
            var PDFName = "";

            var ruta = (from c in db.tbl_Parameters
                        where c.IdParameters == 8
                        select c.ValueOfParameter).FirstOrDefault();

            PaymentVouchers reporte = new PaymentVouchers();
            reporte.parameter1.Value = fecha.Date;

            reporte.BeginUpdate();
            PDFName = "PayRolls_" + fecha.Date.ToString("ddMMyyyy") + ".pdf";
            if (File.Exists(ruta + PDFName))
            {
                File.Delete(ruta + PDFName);
                reporte.ExportToPdf(ruta + PDFName);
            }
            else
            {
                reporte.ExportToPdf(ruta + PDFName);
            }


            return PDFName;
        }

        public string CreatePayRoll(DateTime fecha)
        {
            var PDFName = "";

            var ruta = (from c in db.tbl_Parameters
                        where c.IdParameters == 8
                        select c.ValueOfParameter).FirstOrDefault();

            PayRoll reporte = new PayRoll();
            reporte.parameter1.Value = fecha.Date;

            reporte.BeginUpdate();
            PDFName = "PayRoll_" + fecha.Date.ToString("ddMMyyyy") + ".pdf";
            if (File.Exists(ruta + PDFName))
            {
                File.Delete(ruta + PDFName);
                reporte.ExportToPdf(ruta + PDFName);
            }
            else
            {
                reporte.ExportToPdf(ruta + PDFName);
            }


            return PDFName;
        }

        public string CreatePFDPayRoll(int id)
        {
            var PDFName = "";

            var ruta = (from c in db.tbl_Parameters
                        where c.IdParameters == 8
                        select c.ValueOfParameter).FirstOrDefault();

            PaymentVoucher reporte = new PaymentVoucher();
            reporte.parameter1.Value = id;

            reporte.BeginUpdate();
            PDFName = "PayRolls_" + id + ".pdf";
            if (File.Exists(ruta + PDFName))
            {
                File.Delete(ruta + PDFName);
                reporte.ExportToPdf(ruta + PDFName);
            }
            else
            {
                reporte.ExportToPdf(ruta + PDFName);
            }


            return PDFName;
        }


        public string CreatePFDMedicalRercord(int id)
        {
            var PDFName = "";

            var ruta = (from c in db.tbl_Parameters
                        where c.IdParameters == 9
                        select c.ValueOfParameter).FirstOrDefault();

            PacientesAbonos reporte = new PacientesAbonos();
            reporte.parameter1.Value = id;

            reporte.BeginUpdate();
            PDFName = "MedicalRercord_" + id + ".pdf";
            if (File.Exists(ruta + PDFName))
            {
                File.Delete(ruta + PDFName);
                reporte.ExportToPdf(ruta + PDFName);
            }
            else
            {
                reporte.ExportToPdf(ruta + PDFName);
            }


            return PDFName;
        }


        public string CreatePFDFicha(int id)
        {
            var PDFName = "";

            var ruta = (from c in db.tbl_Parameters
                        where c.IdParameters == 9
                        select c.ValueOfParameter).FirstOrDefault();

            FichaPaciente reporte = new FichaPaciente();
            reporte.parameter1.Value = id;

            reporte.BeginUpdate();
            PDFName = "Ficha_" + id + ".pdf";
            if (File.Exists(ruta + PDFName))
            {
                File.Delete(ruta + PDFName);
                reporte.ExportToPdf(ruta + PDFName);
            }
            else
            {
                reporte.ExportToPdf(ruta + PDFName);
            }


            return PDFName;
        }

    }
}