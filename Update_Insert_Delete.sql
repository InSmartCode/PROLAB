USE [CLINIC]
GO
/****** Object:  StoredProcedure [dbo].[SP_DeleteItemSale]    Script Date: 4/2/2021 22:54:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[SP_DeleteItemSale] 
	-- Add the parameters for the stored procedure here
	@IdSale int ,
	@IdClient int ,
	@ItemCode nvarchar(50) ,
	@ItemName nvarchar(50) ,
	@Quantity int,
	@UnitPrice decimal(18, 4)  
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	DECLARE @SalesType nvarchar(1) = (SELECT SalesType FROM [tbl_Sales] WHERE IdSale=@IdSale)
	DECLARE @LineNum int = (SELECT ISNULL((SELECT MAX(LineNume) FROM [tbl_SalesDetail] WHERE IdSale=@IdSale),0)+1)
	DECLARE @UnitPriceDesc decimal(18, 4) 
	DECLARE @LineTotal decimal(18, 4)
	
	DELETE FROM [tbl_SalesDetail] WHERE ItemCode=@ItemCode and IdSale=@IdSale;
	

		
	DECLARE @IVA decimal(18, 4) =  (SELECT  CONVERT(decimal, ValueOfParameter)/CONVERT(decimal, 100) FROM tbl_Parameters WHERE IdParameters=4);
	DECLARE @SubTotal decimal(18, 4) =  ISNULL((SELECT SUM([LineTotal]) FROM [tbl_SalesDetail] WHERE IdSale=@IdSale),0);
	--SELECT (@SubTotal*@IVA),@SubTotal,(@SubTotal+(@SubTotal*@IVA)), CONVERT(decimal, 13)/CONVERT(decimal, 100)
	IF @SalesType='F'
		BEGIN
			UPDATE [tbl_Sales] SET IVA=(@SubTotal*@IVA), SubTotal=@SubTotal,DocTotal=(@SubTotal+(@SubTotal*@IVA)) WHERE IdSale=@IdSale;
		END
	ELSE
		BEGIN
			UPDATE [tbl_Sales] SET IVA=0, SubTotal=@SubTotal,DocTotal=(@SubTotal) WHERE IdSale=@IdSale;
		END

	DECLARE @Items as table (Row# int, IdSalesDetail int, ItemCode nvarchar(50));
	INSERT INTO @Items SELECT ROW_NUMBER() OVER(ORDER BY IdSalesDetail ASC) AS Row#, IdSalesDetail, ItemCode FROM [tbl_SalesDetail] WHERE IdSale=@IdSale;
	


	DECLARE @Rows int = (SELECT COUNT(*) FROM @Items);
	DECLARE @Rows2 int = 1;
	DECLARE @IdSalesDetail int ;

	WHILE @Rows>=1
		BEGIN
			SET @IdSalesDetail = (SELECT IdSalesDetail FROM @Items WHERE Row#=@Rows2);

			UPDATE [tbl_SalesDetail] SET LineNume= @Rows2 WHERE IdSale=@IdSale AND IdSalesDetail=@IdSalesDetail;
			
			SET @Rows = @Rows -1;
			SET @Rows2 = @Rows2 +1;

		END

END

