<?php namespace Mwl\Http\Controllers\Admin;

use Mwl\Http\Controllers\Controller;

class DashboardController extends Controller
{
  public function index()
  {
    return view('admin.dashboard.index');
  }
}
