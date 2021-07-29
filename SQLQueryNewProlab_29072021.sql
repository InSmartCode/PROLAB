USE [CLINIC]
GO
/****** Object:  StoredProcedure [dbo].[SP_GET_PAYROLL]    Script Date: 29/7/2021 09:23:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[SP_GET_PAYROLL]
	-- Add the parameters for the stored procedure here
	@DATE date
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here


SELECT p.PayDate as DatePayRoll,
	  e.EmployeName + EmployeLastName as EmployeName
	  ,CASE WHEN p.Bonus>0 OR p.Compensation>0 THEN 0 ELSE (Select SUM(NumDaysWorked) FROM tbl_PAYROLL_WorkingDays WHERE IdEmploye=p.IdEmploye AND Month= MONTH(p.PayDate) and NumPay=P.NumPay) END as WorkedDays
      ,p.BaseSalary/31 SalaryBaseDay
      ,p.BaseSalary
      ,CASE WHEN p.Bonus>0 OR p.Compensation>0 THEN 0 ELSE (Select SUM(NumDaysWorked)*SUM(ValueOfDay) FROM tbl_PAYROLL_WorkingDays WHERE IdEmploye=p.IdEmploye AND Month= MONTH(p.PayDate) and NumPay=P.NumPay) END as EarnedSalary
      ,SUM(p.Holidays) as Holidays
      ,SUM(p.ISSS) as ISSS
      ,SUM(p.AFP) as AFP
      ,SUM(p.Rent) as Rent
      ,SUM(p.OtherDiscounts) as OtherDiscounts
	  ,(SUM(p.ISSS) +SUM(p.AFP) + SUM(p.Rent) +SUM(p.OtherDiscounts)) as TotalDesc
      --,p.Bonus
      --,p.Compensation
      ,SUM(p.NetSalary) as NetSalary
	  ,CASE WHEN p.NumPay=1 THEN DATEADD(dd,-(DAY(p.PayDate)-1),@DATE) ELSE DATEADD(dd,-(DAY(@DATE)-15),@DATE) END DateStart
	  ,CASE WHEN p.NumPay=1 THEN DATEADD(dd,-(DAY(p.PayDate)-15),@DATE) ELSE DATEADD(dd,-(DAY(DATEADD(mm,1,@DATE))),DATEADD(mm,1,@DATE)) END DateEnd
  FROM dbo.tbl_PAYROLL_Payrolls p
  INNER JOIN tbl_PAYROLL_Employes e ON e.IdEmploye=p.IdEmploye
 WHERE YEAR(p.PayDate)=YEAR(@DATE) and p.PayMonth=MONTH(@DATE)
  GROUP BY p.IdEmploye,e.EmployeName, EmployeLastName,p.BaseSalary,p.PayDate,p.NumPay, p.Bonus, p.Compensation;



END

GO

USE [CLINIC]
GO
/****** Object:  StoredProcedure [dbo].[SP_GET_PAYROLLS]    Script Date: 29/7/2021 09:24:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[SP_GET_PAYROLLS]
	-- Add the parameters for the stored procedure here
	@Date date
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here


SELECT p.IdPayroll
      ,p.IdEmploye
	  ,e.EmployeName
	  ,e.EmployeLastName
      ,p.BaseSalary
      ,p.EarnedSalary
      ,p.Holidays
      ,p.AFP
      ,p.ISSS
      ,p.Rent
      ,p.OtherDiscounts
      ,p.DialingDiscount
      ,p.Bonus
      ,p.Compensation
      ,p.NetSalary
      ,p.PayDate
      ,p.PayMonth
      ,p.NumPay
	  ,CASE WHEN p.NumPay=1 THEN DATEADD(dd,-(DAY(p.PayDate)-1),p.PayDate) ELSE DATEADD(dd,-(DAY(p.PayDate)-15),p.PayDate) END DateStart
	  ,CASE WHEN p.NumPay=1 THEN DATEADD(dd,-(DAY(p.PayDate)-15),p.PayDate) ELSE DATEADD(dd,-(DAY(DATEADD(mm,1,p.PayDate))),DATEADD(mm,1,p.PayDate)) END DateEnd
  FROM dbo.tbl_PAYROLL_Payrolls p
  INNER JOIN tbl_PAYROLL_Employes e ON e.IdEmploye=p.IdEmploye
  WHERE p.PayMonth=MONTH(@Date);



END



GO


USE [CLINIC]
GO
/****** Object:  StoredProcedure [dbo].[SP_GET_PAYROLLSBYID]    Script Date: 29/7/2021 09:25:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[SP_GET_PAYROLLSBYID]
	-- Add the parameters for the stored procedure here
	@IdPayroll int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here

SELECT p.IdPayroll
      ,p.IdEmploye
	  ,e.EmployeName
	  ,e.EmployeLastName
      ,p.BaseSalary
      ,p.EarnedSalary
      ,p.Holidays
      ,p.AFP
      ,p.ISSS
      ,p.Rent
      ,p.OtherDiscounts
      ,p.DialingDiscount
      ,p.Bonus
      ,p.Compensation
      ,p.NetSalary
      ,p.PayDate
      ,p.PayMonth
      ,p.NumPay
	  ,CASE WHEN p.NumPay=1 THEN DATEADD(dd,-(DAY(p.PayDate)-1),p.PayDate) ELSE DATEADD(dd,-(DAY(p.PayDate)-15),p.PayDate) END DateStart
	  ,CASE WHEN p.NumPay=1 THEN DATEADD(dd,-(DAY(p.PayDate)-15),p.PayDate) ELSE DATEADD(dd,-(DAY(DATEADD(mm,1,p.PayDate))),DATEADD(mm,1,p.PayDate)) END DateEnd

  FROM dbo.tbl_PAYROLL_Payrolls p
  INNER JOIN tbl_PAYROLL_Employes e ON e.IdEmploye=p.IdEmploye
  WHERE p.IdPayroll=@IdPayroll;



END

GO

