<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Pariwisata;
use App\Models\Kategori;
use App\Models\Paket;
use App\Models\Planner;


class ContentController extends Controller
{
    public function showPariwisata(){
        $pariwisata = Pariwisata::all();
        return response()->json([
            'status'=>200,
            'pariwisata' => $pariwisata,
        ]);
    }

    public function showPlanner(){
        $planner = Planner::all();
        return response()->json([
            'status' => 200,
            'planner' => $planner,
        ]);
    }

    public function showPaket(){
        $paket = Paket::all();
        return response()->json([
            'status'=>200,
            'paket' => $paket,
        ]);
    }

    public function showKategori(){
        $kategori = Kategori::all();
        return response()->json([
            'status'=>200,
            'kategori' => $kategori,
        ]);
    }

    public function searchPariwisata($lokasi){
        $pariwisata = Pariwisata::whereRaw("lokasi REGEXP '" . $lokasi . "'")
                                ->orWhereRaw("nama REGEXP '".$lokasi."'")->get();
        return response()->json([
            'status'=>200,
            'pariwisata' => $pariwisata,
        ]);
    }

    public function getPariwisataByID($id){
        $pariwisata = Pariwisata::find($id);
        return response()->json([
            'status'=>200,
            'pariwisata' => $pariwisata,
        ]);
    }
}
