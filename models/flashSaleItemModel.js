const db = require("../config/db");

// ✅ Create Flash Sale Item
const createFlashSaleItem = async (data) => {
    const { sale_id, shoes_id, discount, start_time, end_time, is_active, created_by } = data;
    const [result] = await db.query(
        `INSERT INTO flash_sale_items 
     (sale_id, shoes_id, discount, start_time, end_time, is_active, created_by) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [sale_id, shoes_id, discount, start_time, end_time, is_active, created_by]
    );
    return result;
};

// ✅ Get All Flash Sale Items (with shoe + sale info)
const getAllFlashSaleItems = async () => {
    const [rows] = await db.query(`
    SELECT fsi.*, 
           s.shoe_name, s.brand_name, s.brand_logo, s.shoe_description, 
           s.original_price, s.price, s.image_url, 
           fs.sale_title
    FROM flash_sale_items fsi
    JOIN shoes s ON fsi.shoes_id = s.shoes_id
    JOIN flash_sale fs ON fsi.sale_id = fs.sale_id
  `);
    return rows;
};

// ✅ Get Active Flash Sale Items by Sale Title
const getActiveBySaleTitle = async (saleTitle) => {
    const [rows] = await db.query(`
    SELECT s.shoes_id, s.shoe_name, s.brand_name, s.brand_logo, 
           s.shoe_description, s.original_price, s.price, s.image_url,
           fsi.discount, fsi.start_time, fsi.end_time, fsi.is_active,
           TIMESTAMPDIFF(SECOND, NOW(), fsi.end_time) AS remaining_seconds
    FROM flash_sale_items fsi
    JOIN shoes s ON fsi.shoes_id = s.shoes_id
    JOIN flash_sale fs ON fsi.sale_id = fs.sale_id
    WHERE fs.sale_title = ?
      AND fsi.start_time <= NOW()
      AND fsi.end_time > NOW()
      AND fsi.is_active = TRUE
  `, [saleTitle]);
    return rows;
};

// ✅ Get Flash Sale Item by ID
const getFlashSaleItemById = async (id) => {
    //   const [rows] = await db.query("SELECT * FROM flash_sale_items WHERE sale_item_id = ?", [id]);
    const [rows] = await db.query(`
    SELECT fsi.*, 
           s.shoe_name, s.brand_name, s.brand_logo, s.shoe_description, 
           s.original_price, s.price, s.image_url, 
           fs.sale_title
    FROM flash_sale_items fsi
    JOIN shoes s ON fsi.shoes_id = s.shoes_id
    JOIN flash_sale fs ON fsi.sale_id = fs.sale_id
    WHERE fsi.sale_item_id = ?
  `, [id]);
    return rows[0];
};

// ✅ Update Flash Sale Item
const updateFlashSaleItem = async (id, data) => {
    const { sale_id, shoes_id, discount, start_time, end_time, is_active, updated_by } = data;
    const [result] = await db.query(
        `UPDATE flash_sale_items 
     SET sale_id=?, shoes_id=?, discount=?, start_time=?, end_time=?, is_active=?, updated_by=? 
     WHERE sale_item_id=?`,
        [sale_id, shoes_id, discount, start_time, end_time, is_active, updated_by, id]
    );
    return result;
};

// ✅ Delete Flash Sale Item
const deleteFlashSaleItem = async (id) => {
    const [result] = await db.query("DELETE FROM flash_sale_items WHERE sale_item_id = ?", [id]);
    return result;
};

module.exports = {
    createFlashSaleItem,
    getAllFlashSaleItems,
    getActiveBySaleTitle,
    getFlashSaleItemById,
    updateFlashSaleItem,
    deleteFlashSaleItem,
};