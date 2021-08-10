USE [CLINIC]
GO
/****** Object:  StoredProcedure [dbo].[SP_GET_PAYROLL]    Script Date: 10/8/2021 00:19:04 ******/
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

SELECT DatePayRoll, 
	   EmployeName, 
	   SUM(WorkedDays) WorkedDays, 
	   SalaryBaseDay, 
	   BaseSalary, 
	   BaseSalaryQuincenal, 
	   SUM(Holidays) as Holidays, 
	   SUM(EarnedSalary) as EarnedSalary, 
	   SUM(ISSS) as ISSS, 
	   SUM(AFP) as AFP, 
	   SUM(Rent) as Rent, 
	   SUM(OtherDiscounts) as OtherDiscounts,
	   SUM(TotalDesc) as TotalDesc,
	   SUM(Bonus) as Bonus,
	   SUM(Compensation) as Compensation,
	   SUM(NetSalary) as NetSalary,
	   DateStart,
	   DateEnd
FROM (
	SELECT @DATE as DatePayRoll,
		  e.EmployeName + EmployeLastName as EmployeName
		  ,CASE WHEN p.Bonus>0 OR p.Compensation>0 THEN 0 ELSE (Select SUM(NumDaysWorked) FROM tbl_PAYROLL_WorkingDays WHERE IdEmploye=p.IdEmploye AND Month= MONTH(p.PayDate) and NumPay=P.NumPay) END as WorkedDays
		  ,CASE WHEN p.BaseSalary = 0 THEN e.Salary/31 ELSE p.BaseSalary/31 END as SalaryBaseDay
		  ,CASE WHEN p.BaseSalary = 0 THEN e.Salary/2 ELSE p.BaseSalary/2 END as BaseSalaryQuincenal
		  ,CASE WHEN p.BaseSalary = 0 THEN e.Salary ELSE p.BaseSalary END as BaseSalary
		  ,CASE WHEN p.Bonus>0 OR p.Compensation>0 THEN 0 ELSE (Select SUM(NumDaysWorked)*SUM(ValueOfDay) FROM tbl_PAYROLL_WorkingDays WHERE IdEmploye=p.IdEmploye AND Month= MONTH(p.PayDate) and NumPay=P.NumPay) END as EarnedSalary
		  ,SUM(p.Holidays) as Holidays
		  ,SUM(p.ISSS) as ISSS
		  ,SUM(p.AFP) as AFP
		  ,SUM(p.Rent) as Rent
		  ,SUM(p.OtherDiscounts) as OtherDiscounts
		  ,(SUM(p.ISSS) +SUM(p.AFP) + SUM(p.Rent) +SUM(p.OtherDiscounts)) as TotalDesc
		  ,SUM(p.Bonus) as Bonus
		  ,SUM(p.Compensation) as Compensation
		  ,SUM(p.NetSalary) as NetSalary
		  , DATEADD(dd,-(DAY(@DATE)-1),@DATE) DateStart
		  , DATEADD(dd,-(DAY(DATEADD(mm,1,@DATE))),DATEADD(mm,1,@DATE)) DateEnd
		  ,p.NumPay
	FROM dbo.tbl_PAYROLL_Payrolls p
		INNER JOIN tbl_PAYROLL_Employes e ON e.IdEmploye=p.IdEmploye
	WHERE YEAR(p.PayDate)=YEAR(@DATE) and p.PayMonth=MONTH(@DATE)
	GROUP BY p.IdEmploye,e.EmployeName, EmployeLastName,p.BaseSalary, e.Salary, p.PayDate,p.NumPay, p.Bonus, p.Compensation
 ) T GROUP BY DatePayRoll, EmployeName,  SalaryBaseDay, BaseSalaryQuincenal, BaseSalary, DateStart, DateEnd;



END
