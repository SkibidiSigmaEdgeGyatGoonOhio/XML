<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<html>
<head>
<title>Library Collection</title>
<style>
table {
border-collapse: collapse;
width: 100%;
}
th, td {
border: 1px solid #ddd;
padding: 8px;
text-align: left;
}
th {
background-color: #f2f2f2;
}
tr:nth-child(even) {
background-color: #f9f9f9;
}
</style>
</head>
<body>
<h1>Library Collection</h1>
<table>
<tr>
<th>ID</th>
<th>Title</th>
<th>Author(s)</th>
<th>Year</th>
<th>Genre</th>
<th>Price</th>
<th>Publisher</th>
</tr>
<xsl:for-each select="library/book">
<tr>
<td><xsl:value-of select="@id"/></td>
<td><xsl:value-of select="title"/></td>
<td>
<xsl:for-each select="author">
<xsl:value-of select="."/>
<xsl:if test="@nationality"> (<xsl:value-of select="@nationality"/>)</xsl:if>
<xsl:if test="position() != last()">, </xsl:if>
</xsl:for-each>
</td>
<td><xsl:value-of select="published-year"/></td>
<td><xsl:value-of select="genre"/></td>
<td>$<xsl:value-of select="price"/></td>
<td>
<xsl:if test="publisher">
<xsl:value-of select="publisher/name"/>, <xsl:value-of select="publisher/location"/>
</xsl:if>
</td>
</tr>
</xsl:for-each>
</table></body>
</html>
</xsl:template>
</xsl:stylesheet>