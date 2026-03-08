# -*- coding: utf-8 -*-

from odoo import models
from odoo.http import request
import werkzeug

class MobileHttp(models.AbstractModel):
    _inherit = 'ir.http'

    def session_info(self):
        result = super(MobileHttp, self).session_info()
        result.update({'session_id': request.session.sid, 'session_token': request.session.session_token})
        return result