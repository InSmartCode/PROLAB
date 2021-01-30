USE [CLINIC]
GO
/****** Object:  StoredProcedure [dbo].[SP_GET_Advancements]    Script Date: 30/1/2021 00:22:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[SP_GET_Advancements]
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT IdAdvancements
      ,e.IdEmploye
      ,e.EmployeName + e.EmployeLastName as EmployeName
      ,Concept
      ,Advancements
      ,Refund
      ,Pending
      ,DateAdvancements
  FROM CLINIC.dbo.tbl_PAYROLL_Advancements a
  INNER JOIN CLINIC.dbo.tbl_PAYROLL_Employes e ON e.IdEmploye=a.IdEmploye
END
