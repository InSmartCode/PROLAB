using System;
using System.Drawing;
using System.Collections;
using System.ComponentModel;
using DevExpress.XtraReports.UI;

/// <summary>
/// Summary description for ItemsCatalog
/// </summary>
public class SalesInvoice : DevExpress.XtraReports.UI.XtraReport
{
    private DevExpress.XtraReports.UI.DetailBand Detail;
    private DevExpress.XtraReports.UI.TopMarginBand TopMargin;
    private DevExpress.XtraReports.UI.BottomMarginBand BottomMargin;
    private XRLabel lblCost;
    private XRLabel lblOnHand;
    private XRLabel xrLabel2;
    private XRLabel xrLabel26;
    private XRLabel xrLabelSubTotal;
    private XRLabel xrLabelNumOrden;
    private XRLabel xrLabelFecha;
    private XRLabel xrLabelDireccion;
    private XRLabel xrLabelCliente;
    private XRLabel xrLabelTotal;
    private XRLabel xrLabelIVA;

    public int IdSale;
    public string NIT;
    public string Client;
    public string Address;
    public DateTime Date;
    public string NumOrder;
    public decimal IVA;
    public decimal Total;
    private XRLabel xrLabel1;
    public DevExpress.XtraReports.Parameters.Parameter parameter1;
    private DevExpress.DataAccess.Sql.SqlDataSource sqlDataSource2;
    private GroupFooterBand GroupFooter1;

    /// <summary>
    /// Required designer variable.
    /// </summary>
    private System.ComponentModel.IContainer components = null;

    public SalesInvoice()
    {
        InitializeComponent();
        //
        // TODO: Add constructor logic here
        //
    }

    /// <summary> 
    /// Clean up any resources being used.
    /// </summary>
    /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
    protected override void Dispose(bool disposing)
    {
        if (disposing && (components != null))
        {
            components.Dispose();
        }
        base.Dispose(disposing);
    }

    #region Designer generated code

    /// <summary>
    /// Required method for Designer support - do not modify
    /// the contents of this method with the code editor.
    /// </summary>
    private void InitializeComponent()
    {
            this.components = new System.ComponentModel.Container();
            DevExpress.XtraReports.UI.XRSummary xrSummary1 = new DevExpress.XtraReports.UI.XRSummary();
            DevExpress.DataAccess.Sql.StoredProcQuery storedProcQuery1 = new DevExpress.DataAccess.Sql.StoredProcQuery();
            DevExpress.DataAccess.Sql.QueryParameter queryParameter1 = new DevExpress.DataAccess.Sql.QueryParameter();
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(SalesInvoice));
            this.Detail = new DevExpress.XtraReports.UI.DetailBand();
            this.lblCost = new DevExpress.XtraReports.UI.XRLabel();
            this.lblOnHand = new DevExpress.XtraReports.UI.XRLabel();
            this.xrLabel2 = new DevExpress.XtraReports.UI.XRLabel();
            this.xrLabel26 = new DevExpress.XtraReports.UI.XRLabel();
            this.TopMargin = new DevExpress.XtraReports.UI.TopMarginBand();
            this.xrLabel1 = new DevExpress.XtraReports.UI.XRLabel();
            this.xrLabelNumOrden = new DevExpress.XtraReports.UI.XRLabel();
            this.xrLabelFecha = new DevExpress.XtraReports.UI.XRLabel();
            this.xrLabelDireccion = new DevExpress.XtraReports.UI.XRLabel();
            this.xrLabelCliente = new DevExpress.XtraReports.UI.XRLabel();
            this.BottomMargin = new DevExpress.XtraReports.UI.BottomMarginBand();
            this.xrLabelTotal = new DevExpress.XtraReports.UI.XRLabel();
            this.xrLabelIVA = new DevExpress.XtraReports.UI.XRLabel();
            this.xrLabelSubTotal = new DevExpress.XtraReports.UI.XRLabel();
            this.parameter1 = new DevExpress.XtraReports.Parameters.Parameter();
            this.sqlDataSource2 = new DevExpress.DataAccess.Sql.SqlDataSource(this.components);
            this.GroupFooter1 = new DevExpress.XtraReports.UI.GroupFooterBand();
            ((System.ComponentModel.ISupportInitialize)(this)).BeginInit();
            // 
            // Detail
            // 
            this.Detail.Controls.AddRange(new DevExpress.XtraReports.UI.XRControl[] {
            this.lblCost,
            this.lblOnHand,
            this.xrLabel2,
            this.xrLabel26});
            this.Detail.Dpi = 254F;
            this.Detail.HeightF = 50.38145F;
            this.Detail.Name = "Detail";
            this.Detail.Padding = new DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 254F);
            this.Detail.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft;
            // 
            // lblCost
            // 
            this.lblCost.DataBindings.AddRange(new DevExpress.XtraReports.UI.XRBinding[] {
            new DevExpress.XtraReports.UI.XRBinding("Text", null, "SP_GET_SALES_BY_ID.LineTotal")});
            this.lblCost.Dpi = 254F;
            this.lblCost.Font = new System.Drawing.Font("Times New Roman", 8F);
            this.lblCost.LocationFloat = new DevExpress.Utils.PointFloat(1631.69F, 12.6217F);
            this.lblCost.Name = "lblCost";
            this.lblCost.Padding = new DevExpress.XtraPrinting.PaddingInfo(5, 5, 0, 0, 254F);
            this.lblCost.SizeF = new System.Drawing.SizeF(224.6013F, 31.96163F);
            this.lblCost.StylePriority.UseFont = false;
            this.lblCost.StylePriority.UseTextAlignment = false;
            this.lblCost.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter;
            // 
            // lblOnHand
            // 
            this.lblOnHand.DataBindings.AddRange(new DevExpress.XtraReports.UI.XRBinding[] {
            new DevExpress.XtraReports.UI.XRBinding("Text", null, "SP_GET_SALES_BY_ID.UnitPrice")});
            this.lblOnHand.Dpi = 254F;
            this.lblOnHand.Font = new System.Drawing.Font("Times New Roman", 8F);
            this.lblOnHand.LocationFloat = new DevExpress.Utils.PointFloat(1217.218F, 12.6217F);
            this.lblOnHand.Name = "lblOnHand";
            this.lblOnHand.Padding = new DevExpress.XtraPrinting.PaddingInfo(5, 5, 0, 0, 254F);
            this.lblOnHand.SizeF = new System.Drawing.SizeF(149.0483F, 31.96163F);
            this.lblOnHand.StylePriority.UseFont = false;
            this.lblOnHand.StylePriority.UseTextAlignment = false;
            this.lblOnHand.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter;
            // 
            // xrLabel2
            // 
            this.xrLabel2.DataBindings.AddRange(new DevExpress.XtraReports.UI.XRBinding[] {
            new DevExpress.XtraReports.UI.XRBinding("Text", null, "SP_GET_SALES_BY_ID.ItemName")});
            this.xrLabel2.Dpi = 254F;
            this.xrLabel2.Font = new System.Drawing.Font("Times New Roman", 8F);
            this.xrLabel2.LocationFloat = new DevExpress.Utils.PointFloat(204.6126F, 12.62167F);
            this.xrLabel2.Name = "xrLabel2";
            this.xrLabel2.Padding = new DevExpress.XtraPrinting.PaddingInfo(5, 5, 0, 0, 254F);
            this.xrLabel2.SizeF = new System.Drawing.SizeF(1012.605F, 31.96163F);
            this.xrLabel2.StylePriority.UseFont = false;
            this.xrLabel2.StylePriority.UseTextAlignment = false;
            this.xrLabel2.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft;
            // 
            // xrLabel26
            // 
            this.xrLabel26.DataBindings.AddRange(new DevExpress.XtraReports.UI.XRBinding[] {
            new DevExpress.XtraReports.UI.XRBinding("Text", null, "SP_GET_SALES_BY_ID.Quantity")});
            this.xrLabel26.Dpi = 254F;
            this.xrLabel26.Font = new System.Drawing.Font("Times New Roman", 8F);
            this.xrLabel26.LocationFloat = new DevExpress.Utils.PointFloat(0F, 12.62167F);
            this.xrLabel26.Name = "xrLabel26";
            this.xrLabel26.Padding = new DevExpress.XtraPrinting.PaddingInfo(5, 5, 0, 0, 254F);
            this.xrLabel26.SizeF = new System.Drawing.SizeF(204.6126F, 31.96163F);
            this.xrLabel26.StylePriority.UseFont = false;
            this.xrLabel26.StylePriority.UseTextAlignment = false;
            this.xrLabel26.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter;
            // 
            // TopMargin
            // 
            this.TopMargin.Controls.AddRange(new DevExpress.XtraReports.UI.XRControl[] {
            this.xrLabel1,
            this.xrLabelNumOrden,
            this.xrLabelFecha,
            this.xrLabelDireccion,
            this.xrLabelCliente});
            this.TopMargin.Dpi = 254F;
            this.TopMargin.HeightF = 605F;
            this.TopMargin.Name = "TopMargin";
            this.TopMargin.Padding = new DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 254F);
            this.TopMargin.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft;
            // 
            // xrLabel1
            // 
            this.xrLabel1.Dpi = 254F;
            this.xrLabel1.LocationFloat = new DevExpress.Utils.PointFloat(204.6125F, 472.6139F);
            this.xrLabel1.Name = "xrLabel1";
            this.xrLabel1.Padding = new DevExpress.XtraPrinting.PaddingInfo(5, 5, 0, 0, 254F);
            this.xrLabel1.SizeF = new System.Drawing.SizeF(1099.196F, 31.96161F);
            this.xrLabel1.StylePriority.UseTextAlignment = false;
            this.xrLabel1.Text = "1203-123456-132-1";
            this.xrLabel1.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft;
            // 
            // xrLabelNumOrden
            // 
            this.xrLabelNumOrden.Dpi = 254F;
            this.xrLabelNumOrden.LocationFloat = new DevExpress.Utils.PointFloat(1551.341F, 472.6139F);
            this.xrLabelNumOrden.Name = "xrLabelNumOrden";
            this.xrLabelNumOrden.Padding = new DevExpress.XtraPrinting.PaddingInfo(5, 5, 0, 0, 254F);
            this.xrLabelNumOrden.SizeF = new System.Drawing.SizeF(448.6592F, 31.96161F);
            this.xrLabelNumOrden.StylePriority.UseTextAlignment = false;
            this.xrLabelNumOrden.Text = "Orden 258";
            this.xrLabelNumOrden.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft;
            // 
            // xrLabelFecha
            // 
            this.xrLabelFecha.Dpi = 254F;
            this.xrLabelFecha.LocationFloat = new DevExpress.Utils.PointFloat(1551.341F, 391.0517F);
            this.xrLabelFecha.Name = "xrLabelFecha";
            this.xrLabelFecha.Padding = new DevExpress.XtraPrinting.PaddingInfo(5, 5, 0, 0, 254F);
            this.xrLabelFecha.SizeF = new System.Drawing.SizeF(448.6594F, 31.96164F);
            this.xrLabelFecha.StylePriority.UseTextAlignment = false;
            this.xrLabelFecha.Text = "02/03/2020";
            this.xrLabelFecha.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft;
            // 
            // xrLabelDireccion
            // 
            this.xrLabelDireccion.Dpi = 254F;
            this.xrLabelDireccion.LocationFloat = new DevExpress.Utils.PointFloat(204.6126F, 423.0134F);
            this.xrLabelDireccion.Name = "xrLabelDireccion";
            this.xrLabelDireccion.Padding = new DevExpress.XtraPrinting.PaddingInfo(5, 5, 0, 0, 254F);
            this.xrLabelDireccion.SizeF = new System.Drawing.SizeF(1795.387F, 49.60056F);
            this.xrLabelDireccion.StylePriority.UseTextAlignment = false;
            this.xrLabelDireccion.Text = "Santa Ana";
            this.xrLabelDireccion.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft;
            // 
            // xrLabelCliente
            // 
            this.xrLabelCliente.Dpi = 254F;
            this.xrLabelCliente.LocationFloat = new DevExpress.Utils.PointFloat(204.6125F, 391.0517F);
            this.xrLabelCliente.Name = "xrLabelCliente";
            this.xrLabelCliente.Padding = new DevExpress.XtraPrinting.PaddingInfo(5, 5, 0, 0, 254F);
            this.xrLabelCliente.SizeF = new System.Drawing.SizeF(1099.196F, 31.96164F);
            this.xrLabelCliente.StylePriority.UseTextAlignment = false;
            this.xrLabelCliente.Text = "Dr. Silva";
            this.xrLabelCliente.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft;
            this.xrLabelCliente.BeforePrint += new System.Drawing.Printing.PrintEventHandler(this.xrLabelCliente_BeforePrint);
            // 
            // BottomMargin
            // 
            this.BottomMargin.Dpi = 254F;
            this.BottomMargin.HeightF = 94F;
            this.BottomMargin.Name = "BottomMargin";
            this.BottomMargin.Padding = new DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 254F);
            this.BottomMargin.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft;
            // 
            // xrLabelTotal
            // 
            this.xrLabelTotal.Dpi = 254F;
            this.xrLabelTotal.Font = new System.Drawing.Font("Times New Roman", 8F);
            this.xrLabelTotal.LocationFloat = new DevExpress.Utils.PointFloat(1631.69F, 709.8069F);
            this.xrLabelTotal.Name = "xrLabelTotal";
            this.xrLabelTotal.Padding = new DevExpress.XtraPrinting.PaddingInfo(5, 5, 0, 0, 254F);
            this.xrLabelTotal.SizeF = new System.Drawing.SizeF(224.6013F, 31.96164F);
            this.xrLabelTotal.StylePriority.UseFont = false;
            this.xrLabelTotal.StylePriority.UseTextAlignment = false;
            this.xrLabelTotal.Text = "126.7973";
            this.xrLabelTotal.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight;
            // 
            // xrLabelIVA
            // 
            this.xrLabelIVA.Dpi = 254F;
            this.xrLabelIVA.Font = new System.Drawing.Font("Times New Roman", 8F);
            this.xrLabelIVA.LocationFloat = new DevExpress.Utils.PointFloat(1631.69F, 511.405F);
            this.xrLabelIVA.Name = "xrLabelIVA";
            this.xrLabelIVA.Padding = new DevExpress.XtraPrinting.PaddingInfo(5, 5, 0, 0, 254F);
            this.xrLabelIVA.SizeF = new System.Drawing.SizeF(224.6014F, 31.96163F);
            this.xrLabelIVA.StylePriority.UseFont = false;
            this.xrLabelIVA.StylePriority.UseTextAlignment = false;
            this.xrLabelIVA.Text = "14.5873";
            this.xrLabelIVA.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight;
            // 
            // xrLabelSubTotal
            // 
            this.xrLabelSubTotal.DataBindings.AddRange(new DevExpress.XtraReports.UI.XRBinding[] {
            new DevExpress.XtraReports.UI.XRBinding("Text", null, "SP_GET_SALES_BY_ID.LineTotal")});
            this.xrLabelSubTotal.Dpi = 254F;
            this.xrLabelSubTotal.Font = new System.Drawing.Font("Times New Roman", 8F);
            this.xrLabelSubTotal.LocationFloat = new DevExpress.Utils.PointFloat(1631.69F, 463.5684F);
            this.xrLabelSubTotal.Name = "xrLabelSubTotal";
            this.xrLabelSubTotal.Padding = new DevExpress.XtraPrinting.PaddingInfo(5, 5, 0, 0, 254F);
            this.xrLabelSubTotal.SizeF = new System.Drawing.SizeF(224.6016F, 31.96163F);
            this.xrLabelSubTotal.StylePriority.UseFont = false;
            this.xrLabelSubTotal.StylePriority.UseTextAlignment = false;
            xrSummary1.FormatString = "{0:##,###.00}";
            xrSummary1.Running = DevExpress.XtraReports.UI.SummaryRunning.Report;
            this.xrLabelSubTotal.Summary = xrSummary1;
            this.xrLabelSubTotal.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight;
            // 
            // parameter1
            // 
            this.parameter1.Description = "Parameter1";
            this.parameter1.Name = "parameter1";
            this.parameter1.Type = typeof(int);
            this.parameter1.ValueInfo = "0";
            // 
            // sqlDataSource2
            // 
            this.sqlDataSource2.ConnectionName = "localhost_CLINIC_Connection";
            this.sqlDataSource2.Name = "sqlDataSource2";
            storedProcQuery1.Name = "SP_GET_SALES_BY_ID";
            queryParameter1.Name = "@IdSale";
            queryParameter1.Type = typeof(DevExpress.DataAccess.Expression);
            queryParameter1.Value = new DevExpress.DataAccess.Expression("[Parameters.parameter1]", typeof(int));
            storedProcQuery1.Parameters.Add(queryParameter1);
            storedProcQuery1.StoredProcName = "SP_GET_SALES_BY_ID";
            this.sqlDataSource2.Queries.AddRange(new DevExpress.DataAccess.Sql.SqlQuery[] {
            storedProcQuery1});
            this.sqlDataSource2.ResultSchemaSerializable = resources.GetString("sqlDataSource2.ResultSchemaSerializable");
            // 
            // GroupFooter1
            // 
            this.GroupFooter1.Controls.AddRange(new DevExpress.XtraReports.UI.XRControl[] {
            this.xrLabelTotal,
            this.xrLabelIVA,
            this.xrLabelSubTotal});
            this.GroupFooter1.Dpi = 254F;
            this.GroupFooter1.HeightF = 1063.625F;
            this.GroupFooter1.Name = "GroupFooter1";
            // 
            // SalesInvoice
            // 
            this.Bands.AddRange(new DevExpress.XtraReports.UI.Band[] {
            this.Detail,
            this.TopMargin,
            this.BottomMargin,
            this.GroupFooter1});
            this.ComponentStorage.AddRange(new System.ComponentModel.IComponent[] {
            this.sqlDataSource2});
            this.DataMember = "SP_GET_SALES_BY_ID";
            this.DataSource = this.sqlDataSource2;
            this.Dpi = 254F;
            this.Margins = new System.Drawing.Printing.Margins(109, 50, 605, 94);
            this.PageHeight = 2794;
            this.PageWidth = 2162;
            this.PaperKind = System.Drawing.Printing.PaperKind.Custom;
            this.Parameters.AddRange(new DevExpress.XtraReports.Parameters.Parameter[] {
            this.parameter1});
            this.ReportUnit = DevExpress.XtraReports.UI.ReportUnit.TenthsOfAMillimeter;
            this.SnapGridSize = 25F;
            this.Version = "17.1";
            ((System.ComponentModel.ISupportInitialize)(this)).EndInit();

    }

    #endregion
    

    private void xrLabelCliente_BeforePrint(object sender, System.Drawing.Printing.PrintEventArgs e)
    {
        xrLabel1.Text = NIT;
        xrLabelCliente.Text = Client;
        xrLabelDireccion.Text = Address;
        xrLabelFecha.Text = Date.ToString("dd/MM/yyyy");
        xrLabelNumOrden.Text = "Orden #"+NumOrder;
        //xrLabelIVA.Text = (Convert.ToDecimal(xrLabelSubTotal.Text) * (decimal)0.12).ToString();
        xrLabelIVA.Text = (Math.Round(IVA,2)).ToString();
        //xrLabelTotal.Text = (Convert.ToDecimal(xrLabelSubTotal.Text) + Convert.ToDecimal(xrLabelIVA.Text)).ToString();
        xrLabelTotal.Text = (Math.Round(Total,2)).ToString();
    }
}
