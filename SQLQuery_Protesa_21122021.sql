USE [CLINIC]
GO
/****** Object:  StoredProcedure [dbo].[SP_SAVESALE]    Script Date: 21/12/2021 23:34:58 ******/
DROP PROCEDURE [dbo].[SP_SAVESALE]
GO
/****** Object:  StoredProcedure [dbo].[SP_SAVEPURCHASE]    Script Date: 21/12/2021 23:34:58 ******/
DROP PROCEDURE [dbo].[SP_SAVEPURCHASE]
GO
/****** Object:  Table [dbo].[tbl_InventoryLog]    Script Date: 21/12/2021 23:34:58 ******/
--DROP TABLE [dbo].[tbl_InventoryLog]
--GO
/****** Object:  Table [dbo].[tbl_InventoryLog]    Script Date: 21/12/2021 23:34:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_InventoryLog](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ItemCode] [nvarchar](50) NULL,
	[ItemName] [nvarchar](50) NULL,
	[Quantity] [decimal](18, 2) NULL,
	[Process] [nvarchar](50) NULL,
	[ProcesDate] [datetime] NULL,
 CONSTRAINT [PK_tbl_InventoryLog] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  StoredProcedure [dbo].[SP_SAVEPURCHASE]    Script Date: 21/12/2021 23:34:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[SP_SAVEPURCHASE]
	-- Add the parameters for the stored procedure here
	@IPurchase int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	DECLARE @Status NVARCHAR(1)= (Select Status from tbl_Purchase WHERE IdPurchase = @IPurchase);
	if @Status='E'
		BEGIN
			DECLARE @ItemCode NVARCHAR(50), @ItemName NVARCHAR(50),  @Quantity int, @ItemCodeInsumo NVARCHAR(50), @QuantityInsumo DECIMAL(18,2);  
  
			DECLARE vendor_cursor CURSOR FOR   
			SELECT ItemCode, ItemName, Quantity  FROM tbl_PurchaseDetail	WHERE IdPurchase = @IPurchase	ORDER BY LineNume;    
			OPEN vendor_cursor    
			FETCH NEXT FROM vendor_cursor INTO @ItemCode, @ItemName, @Quantity    
			WHILE @@FETCH_STATUS = 0  
			BEGIN  
				UPDATE tbl_Inventory SET [UnitsOnHand] = [UnitsOnHand] + @Quantity WHERE ItemCode=@ItemCode;

				INSERT INTO tbl_InventoryLog ([ItemCode],[ItemName],[Quantity],[Process],[ProcesDate]) 
									  VALUES (@ItemCode,@ItemName,@Quantity,'Descarga',GETDATE());
                -- DECLARE product_cursor CURSOR FOR   
                -- SELECT ItemCode, Quantity FROM tbl_Recipes WHERE ItemCode=@ItemCode      
                -- OPEN product_cursor  FETCH NEXT FROM product_cursor INTO @ItemCodeInsumo, @QuantityInsumo             
                -- WHILE @@FETCH_STATUS = 0  
                -- BEGIN  
                --     UPDATE tbl_Inventory SET [UnitsOnHand] = [UnitsOnHand] + @QuantityInsumo WHERE ItemCode=@ItemCodeInsumo;
                    
                --     FETCH NEXT FROM product_cursor INTO @ItemCodeInsumo, @QuantityInsumo 
                -- END              
                -- CLOSE product_cursor  
                -- DEALLOCATE product_cursor 

				FETCH NEXT FROM vendor_cursor INTO @ItemCode, @ItemName, @Quantity  
			END   
			CLOSE vendor_cursor;  
			DEALLOCATE vendor_cursor;  

			UPDATE tbl_Purchase SET Status='R' WHERE IdPurchase = @IPurchase;
		END


END
GO
/****** Object:  StoredProcedure [dbo].[SP_SAVESALE]    Script Date: 21/12/2021 23:34:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[SP_SAVESALE]
	-- Add the parameters for the stored procedure here
	@ISale int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	DECLARE @Status NVARCHAR(1)= (Select Status from tbl_Sales WHERE IdSale=@ISale);
	if @Status='E'
		BEGIN
			DECLARE @ItemCode NVARCHAR(50), @ItemName NVARCHAR(50),  @Quantity int, @ItemCodeInsumo NVARCHAR(50), @ItemNameInsumo NVARCHAR(50), @QuantityInsumo DECIMAL(18,2);  
  
			DECLARE vendor_cursor CURSOR FOR   
			SELECT ItemCode, ItemName, Quantity FROM tbl_SalesDetail WHERE IdSale = @ISale	ORDER BY LineNume;    
			OPEN vendor_cursor    
			FETCH NEXT FROM vendor_cursor  INTO @ItemCode, @ItemName, @Quantity    
			WHILE @@FETCH_STATUS = 0  
			BEGIN   
				UPDATE tbl_Inventory SET [UnitsOnHand] = [UnitsOnHand] - @Quantity WHERE ItemCode=@ItemCode;
				
				INSERT INTO tbl_InventoryLog ([ItemCode],[ItemName],[Quantity],[Process],[ProcesDate]) 
									  VALUES (@ItemCode,@ItemName,@Quantity,'Carga',GETDATE());

                DECLARE product_cursor CURSOR FOR   
                SELECT ItemCode, [Description], Quantity FROM tbl_Recipes WHERE ItemCode=@ItemCode      
                OPEN product_cursor  FETCH NEXT FROM product_cursor INTO @ItemCodeInsumo, @ItemNameInsumo, @QuantityInsumo             
                WHILE @@FETCH_STATUS = 0  
                BEGIN  
                    UPDATE tbl_Inventory SET [UnitsOnHand] = [UnitsOnHand] - @QuantityInsumo WHERE ItemCode=@ItemCodeInsumo;
				
					INSERT INTO tbl_InventoryLog ([ItemCode],[ItemName],[Quantity],[Process],[ProcesDate]) 
									  VALUES (@ItemCodeInsumo,@ItemNameInsumo,@QuantityInsumo,'Carga',GETDATE());
                    
                    FETCH NEXT FROM product_cursor INTO @ItemCodeInsumo, @ItemNameInsumo, @QuantityInsumo 
                END              
                CLOSE product_cursor  
                DEALLOCATE product_cursor 

				FETCH NEXT FROM vendor_cursor INTO @ItemCode, @ItemName, @Quantity  
			END   
			CLOSE vendor_cursor;  
			DEALLOCATE vendor_cursor;  

			UPDATE tbl_Sales SET Status='R' WHERE IdSale=@ISale;
		END
	


END
GO
